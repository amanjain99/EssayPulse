import { StarRating } from "./StarRating";

export interface TraitData {
  id: string;
  name: string;
  score: number;
  working: string[];
  workOn: string[];
}

interface TraitCardProps {
  trait: TraitData;
  hasBeenChecked: boolean;
  onClick: () => void;
}

export function TraitCard({ trait, hasBeenChecked, onClick }: TraitCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={!hasBeenChecked}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200
        ${
          hasBeenChecked
            ? "bg-bg-primary border-border hover:border-accent-light hover:shadow-[var(--shadow-soft)] cursor-pointer"
            : "bg-bg-secondary/50 border-transparent cursor-default"
        }`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`font-medium ${hasBeenChecked ? "text-text-primary" : "text-text-secondary"}`}>
          {trait.name}
        </h3>
        {hasBeenChecked && (
          <svg className="w-4 h-4 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
      <div className="mt-2">
        <StarRating score={hasBeenChecked ? trait.score : 0} size="sm" />
      </div>
    </button>
  );
}

