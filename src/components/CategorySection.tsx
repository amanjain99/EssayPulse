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
    <div className="tw-accordion">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="tw-accordion-header"
      >
        <div>
          <h2 className="tw-accordion-title">
            {category.name}
          </h2>
          <p className="tw-accordion-subtitle">{category.description}</p>
        </div>
        <svg
          className={`tw-accordion-icon w-5 h-5 ${isOpen ? "open" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="tw-accordion-content">
          <div className="space-y-3">
            {category.prompts.map((prompt) => (
              <PromptCard key={prompt.id} id={prompt.id} text={prompt.text} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
