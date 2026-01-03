import { useState } from "react";
import { PromptCard } from "./PromptCard";
import type { Category } from "../lib/prompts";

interface CategorySectionProps {
  category: Category;
  defaultOpen?: boolean;
}

export function CategorySection({ category, defaultOpen = true }: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-bg-secondary rounded-xl 
                   hover:bg-border/50 transition-colors cursor-pointer"
      >
        <div className="text-left">
          <h2 className="font-serif text-xl font-semibold text-text-primary">
            {category.name}
          </h2>
          <p className="text-sm text-text-secondary mt-1">{category.description}</p>
        </div>
        <svg
          className={`w-5 h-5 text-accent-light transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 grid gap-3 pl-2">
          {category.prompts.map((prompt) => (
            <PromptCard key={prompt.id} id={prompt.id} text={prompt.text} />
          ))}
        </div>
      )}
    </div>
  );
}

