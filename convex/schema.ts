import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  essays: defineTable({
    promptId: v.string(),
    promptText: v.string(),
    content: v.string(),
    wordCount: v.number(),
    paragraphCount: v.number(),
    feedback: v.optional(
      v.object({
        relevance: v.optional(
          v.object({
            score: v.number(), // 1-5 scale
            isOnTopic: v.boolean(), // true if score >= 3
            explanation: v.string(), // Why it is or isn't on topic
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
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});

