import { StarRating } from "./StarRating";
import type { TraitData } from "./TraitCard";

interface TraitDetailModalProps {
  trait: TraitData;
  onClose: () => void;
}

export function TraitDetailModal({ trait, onClose }: TraitDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text-primary/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-bg-primary rounded-2xl shadow-[var(--shadow-medium)] max-w-lg w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-bg-primary p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-text-primary">
                {trait.name}
              </h2>
              <div className="mt-2">
                <StarRating score={trait.score} size="md" />
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-bg-secondary transition-colors text-text-secondary hover:text-text-primary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* What's Working */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary">What's Working</h3>
            </div>
            <ul className="space-y-2">
              {trait.working.map((item, index) => (
                <li key={index} className="flex gap-3 text-text-secondary">
                  <span className="text-success mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Work On */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary">What to Work On</h3>
            </div>
            <ul className="space-y-2">
              {trait.workOn.map((item, index) => (
                <li key={index} className="flex gap-3 text-text-secondary">
                  <span className="text-warning mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

