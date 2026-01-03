import { action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const SYSTEM_PROMPT = `You are an expert writing coach specializing in narrative essays for students. Your role is to evaluate student writing and provide constructive, encouraging feedback.

IMPORTANT: First, you MUST evaluate whether the essay actually addresses the given prompt. This is critical to avoid giving misleading feedback.

## Step 1: Relevance Check
Evaluate how well the essay addresses the specific prompt (1-5 scale):
- 5: Directly and thoroughly addresses the prompt
- 4: Mostly addresses the prompt with minor tangents
- 3: Partially addresses the prompt but misses key aspects
- 2: Loosely related to the prompt but mostly off-topic
- 1: Does not address the prompt at all

If the relevance score is 1 or 2, the essay is considered OFF-TOPIC.

## Step 2: Trait Evaluation (only meaningful if on-topic)
Evaluate based on these 6 traits, scoring each from 1-5:

1. Hook & Opening (1-5): Does the opening grab attention? Is there an engaging hook that draws readers in?
2. Story Structure (1-5): Is there a clear beginning, middle, and end? Does the narrative flow logically?
3. Descriptive Details (1-5): Does the writing use vivid sensory details? Are scenes painted clearly for the reader?
4. Transitions (1-5): Are transitions smooth between paragraphs and ideas? Does the story flow naturally?
5. Voice & Tone (1-5): Is there a unique, authentic voice? Is the tone consistent and appropriate?
6. Conclusion (1-5): Does the ending provide closure? Is there reflection or insight?

For each trait, provide:
- 2-3 specific things that are working well ("working")
- 2-3 specific, actionable suggestions for improvement ("workOn")

Be encouraging but honest. Reference specific parts of the essay when possible.

Respond ONLY with valid JSON in this exact format:
{
  "relevance": {
    "score": <1-5>,
    "explanation": "<Brief explanation of how well the essay addresses the prompt, and what the essay is actually about if off-topic>"
  },
  "hookAndOpening": { "score": <1-5>, "working": ["...", "..."], "workOn": ["...", "..."] },
  "storyStructure": { "score": <1-5>, "working": ["...", "..."], "workOn": ["...", "..."] },
  "descriptiveDetails": { "score": <1-5>, "working": ["...", "..."], "workOn": ["...", "..."] },
  "transitions": { "score": <1-5>, "working": ["...", "..."], "workOn": ["...", "..."] },
  "voiceAndTone": { "score": <1-5>, "working": ["...", "..."], "workOn": ["...", "..."] },
  "conclusion": { "score": <1-5>, "working": ["...", "..."], "workOn": ["...", "..."] }
}`;

export const generateFeedback = action({
  args: {
    essayId: v.id("essays"),
  },
  handler: async (ctx, args) => {
    // Get the essay
    const essay = await ctx.runQuery(internal.feedback.getEssayInternal, {
      essayId: args.essayId,
    });

    if (!essay) {
      throw new Error("Essay not found");
    }

    // Strip HTML tags from content for cleaner analysis
    const plainText = essay.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

    if (!plainText || plainText.length < 50) {
      throw new Error("Essay is too short for feedback");
    }

    // Call OpenAI
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Please evaluate this narrative essay written in response to the prompt: "${essay.promptText}"

Essay:
${plainText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try to extract JSON from the response if it contains extra text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse OpenAI response as JSON");
      }
    }

    // Validate and extract relevance
    if (!parsed.relevance || typeof parsed.relevance.score !== 'number') {
      throw new Error("Invalid response: missing relevance data");
    }
    
    const relevance = {
      score: parsed.relevance.score,
      isOnTopic: parsed.relevance.score >= 3,
      explanation: parsed.relevance.explanation || "No explanation provided",
    };

    // Extract traits - validate and structure each one
    const extractTrait = (key: string, alternateKeys: string[] = []) => {
      // Try the main key first, then alternate keys
      const keysToTry = [key, ...alternateKeys];
      let traitData = null;
      
      for (const k of keysToTry) {
        if (parsed[k]) {
          traitData = parsed[k];
          break;
        }
      }
      
      if (!traitData) {
        // Return a default structure if trait is missing
        console.log(`Missing trait: ${key}, available keys:`, Object.keys(parsed));
        return {
          score: 1,
          working: ["Unable to analyze this trait"],
          workOn: ["Please try checking again"],
        };
      }
      
      // Filter out null values and ensure arrays contain only strings
      const working = (traitData.working ?? []).filter((s: unknown) => typeof s === 'string');
      const workOn = (traitData.workOn ?? []).filter((s: unknown) => typeof s === 'string');
      return {
        score: typeof traitData.score === 'number' ? traitData.score : 1,
        working: working.length > 0 ? working : ["Good progress on this trait"],
        workOn: workOn.length > 0 ? workOn : ["Continue developing this area"],
      };
    };

    const traits = {
      hookAndOpening: extractTrait('hookAndOpening', ['hook_and_opening', 'hookOpening', 'hook']),
      storyStructure: extractTrait('storyStructure', ['story_structure', 'structure']),
      descriptiveDetails: extractTrait('descriptiveDetails', ['descriptive_details', 'details']),
      transitions: extractTrait('transitions', ['transition']),
      voiceAndTone: extractTrait('voiceAndTone', ['voice_and_tone', 'voice', 'tone']),
      conclusion: extractTrait('conclusion', ['ending']),
    };

    // Store the feedback
    await ctx.runMutation(internal.feedback.storeFeedback, {
      essayId: args.essayId,
      feedback: {
        relevance,
        traits,
        checkedAt: Date.now(),
      },
    });

    return { relevance, traits };
  },
});

export const getEssayInternal = internalQuery({
  args: {
    essayId: v.id("essays"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.essayId);
  },
});

export const storeFeedback = internalMutation({
  args: {
    essayId: v.id("essays"),
    feedback: v.object({
      relevance: v.optional(
        v.object({
          score: v.number(),
          isOnTopic: v.boolean(),
          explanation: v.string(),
        })
      ),
      traits: v.object({
        hookAndOpening: v.object({
          score: v.number(),
          working: v.array(v.string()),
          workOn: v.array(v.string()),
        }),
        storyStructure: v.object({
          score: v.number(),
          working: v.array(v.string()),
          workOn: v.array(v.string()),
        }),
        descriptiveDetails: v.object({
          score: v.number(),
          working: v.array(v.string()),
          workOn: v.array(v.string()),
        }),
        transitions: v.object({
          score: v.number(),
          working: v.array(v.string()),
          workOn: v.array(v.string()),
        }),
        voiceAndTone: v.object({
          score: v.number(),
          working: v.array(v.string()),
          workOn: v.array(v.string()),
        }),
        conclusion: v.object({
          score: v.number(),
          working: v.array(v.string()),
          workOn: v.array(v.string()),
        }),
      }),
      checkedAt: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.essayId, {
      feedback: args.feedback,
      updatedAt: Date.now(),
    });
  },
});
