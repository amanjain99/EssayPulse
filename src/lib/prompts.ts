export interface Prompt {
  id: string;
  text: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  prompts: Prompt[];
}

export const categories: Category[] = [
  {
    id: "life-moments",
    name: "Life Moments",
    description: "Pivotal experiences that shaped who you are",
    prompts: [
      {
        id: "lm-1",
        text: "Describe a moment when you realized something important about yourself.",
        category: "life-moments",
      },
      {
        id: "lm-2",
        text: "Write about a time when you had to make a difficult decision.",
        category: "life-moments",
      },
      {
        id: "lm-3",
        text: "Tell the story of a day that changed your perspective on life.",
        category: "life-moments",
      },
      {
        id: "lm-4",
        text: "Describe a moment when you felt truly proud of yourself.",
        category: "life-moments",
      },
      {
        id: "lm-5",
        text: "Write about an unexpected event that taught you an important lesson.",
        category: "life-moments",
      },
    ],
  },
  {
    id: "relationships",
    name: "Relationships",
    description: "Stories about the people who matter most",
    prompts: [
      {
        id: "rel-1",
        text: "Write about a person who influenced your life in a meaningful way.",
        category: "relationships",
      },
      {
        id: "rel-2",
        text: "Describe a time when a friendship was tested.",
        category: "relationships",
      },
      {
        id: "rel-3",
        text: "Tell the story of a meaningful conversation that stayed with you.",
        category: "relationships",
      },
      {
        id: "rel-4",
        text: "Write about a moment when you truly understood someone for the first time.",
        category: "relationships",
      },
      {
        id: "rel-5",
        text: "Describe an act of kindness from a stranger that you'll never forget.",
        category: "relationships",
      },
    ],
  },
  {
    id: "firsts-milestones",
    name: "Firsts & Milestones",
    description: "New beginnings and significant achievements",
    prompts: [
      {
        id: "fm-1",
        text: "Write about your first day at a new school, job, or place.",
        category: "firsts-milestones",
      },
      {
        id: "fm-2",
        text: "Describe the moment you accomplished something you never thought possible.",
        category: "firsts-milestones",
      },
      {
        id: "fm-3",
        text: "Tell the story of learning a new skill that changed your life.",
        category: "firsts-milestones",
      },
      {
        id: "fm-4",
        text: "Write about the first time you stood up for yourself or someone else.",
        category: "firsts-milestones",
      },
      {
        id: "fm-5",
        text: "Describe a celebration or achievement that marked a turning point.",
        category: "firsts-milestones",
      },
    ],
  },
  {
    id: "challenges",
    name: "Challenges",
    description: "Obstacles overcome and lessons learned",
    prompts: [
      {
        id: "ch-1",
        text: "Write about a time when you failed and what you learned from it.",
        category: "challenges",
      },
      {
        id: "ch-2",
        text: "Describe overcoming a fear that once held you back.",
        category: "challenges",
      },
      {
        id: "ch-3",
        text: "Tell the story of a problem you solved in a creative way.",
        category: "challenges",
      },
      {
        id: "ch-4",
        text: "Write about a time when you had to adapt to an unexpected change.",
        category: "challenges",
      },
      {
        id: "ch-5",
        text: "Describe a situation where you had to persevere despite wanting to give up.",
        category: "challenges",
      },
    ],
  },
  {
    id: "memories",
    name: "Memories",
    description: "Moments from the past worth preserving",
    prompts: [
      {
        id: "mem-1",
        text: "Write about a childhood memory that still brings you joy.",
        category: "memories",
      },
      {
        id: "mem-2",
        text: "Describe a place from your past that holds special meaning.",
        category: "memories",
      },
      {
        id: "mem-3",
        text: "Tell the story of a family tradition or gathering you cherish.",
        category: "memories",
      },
      {
        id: "mem-4",
        text: "Write about an object that holds precious memories for you.",
        category: "memories",
      },
      {
        id: "mem-5",
        text: "Describe a moment of simple happiness that you often think about.",
        category: "memories",
      },
    ],
  },
];

export const getPromptById = (id: string): Prompt | undefined => {
  for (const category of categories) {
    const prompt = category.prompts.find((p) => p.id === id);
    if (prompt) return prompt;
  }
  return undefined;
};

