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
      className={`tw-panel w-full text-left ${hasBeenChecked ? "tw-panel-interactive" : ""}`}
      style={{ 
        opacity: hasBeenChecked ? 1 : 0.6,
        cursor: hasBeenChecked ? "pointer" : "default"
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="tw-trait-name">{trait.name}</h3>
        {hasBeenChecked && (
          <span className="tw-caption">→</span>
        )}
      </div>
      <div className="mt-2">
        <StarRating score={hasBeenChecked ? trait.score : 0} size="sm" />
      </div>
    </button>
  );
}
