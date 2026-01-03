import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createEssay = mutation({
  args: {
    promptId: v.string(),
    promptText: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const essayId = await ctx.db.insert("essays", {
      promptId: args.promptId,
      promptText: args.promptText,
      content: "",
      wordCount: 0,
      paragraphCount: 0,
      feedback: undefined,
      createdAt: now,
      updatedAt: now,
    });
    return essayId;
  },
});

export const updateEssay = mutation({
  args: {
    essayId: v.id("essays"),
    content: v.string(),
    wordCount: v.number(),
    paragraphCount: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.essayId, {
      content: args.content,
      wordCount: args.wordCount,
      paragraphCount: args.paragraphCount,
      updatedAt: Date.now(),
    });
  },
});

export const getEssay = query({
  args: {
    essayId: v.id("essays"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.essayId);
  },
});

export const listEssays = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("essays").order("desc").collect();
  },
});

