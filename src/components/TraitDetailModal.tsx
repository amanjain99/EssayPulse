import { StarRating } from "./StarRating";
import type { TraitData } from "./TraitCard";

interface TraitDetailModalProps {
  trait: TraitData;
  onClose: () => void;
}

export function TraitDetailModal({ trait, onClose }: TraitDetailModalProps) {
  return (
    <div className="tw-modal-overlay" onClick={onClose}>
      {/* Modal */}
      <div className="tw-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="tw-modal-header">
          <div>
            <h2 className="tw-modal-title">{trait.name}</h2>
            <div className="mt-2">
              <StarRating score={trait.score} size="md" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="tw-modal-close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="tw-modal-body">
          {/* What's Working */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 className="tw-h4" style={{ marginBottom: "0.75rem", color: "var(--color-success)" }}>
              What's Working
            </h4>
            <ul className="tw-list">
              {trait.working.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* What to Work On */}
          <div>
            <h4 className="tw-h4" style={{ marginBottom: "0.75rem", color: "var(--color-accent)" }}>
              Work On
            </h4>
            <ul className="tw-list">
              {trait.workOn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="tw-modal-footer">
          <button className="tw-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
