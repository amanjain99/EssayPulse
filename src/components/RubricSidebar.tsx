import { useState } from "react";
import { TraitCard, type TraitData } from "./TraitCard";
import { TraitDetailModal } from "./TraitDetailModal";

interface FeedbackTraits {
  hookAndOpening: { score: number; working: string[]; workOn: string[] };
  storyStructure: { score: number; working: string[]; workOn: string[] };
  descriptiveDetails: { score: number; working: string[]; workOn: string[] };
  transitions: { score: number; working: string[]; workOn: string[] };
  voiceAndTone: { score: number; working: string[]; workOn: string[] };
  conclusion: { score: number; working: string[]; workOn: string[] };
}

interface Relevance {
  score: number;
  isOnTopic: boolean;
  explanation: string;
}

interface RubricSidebarProps {
  feedback: { relevance?: Relevance; traits: FeedbackTraits; checkedAt: number } | null | undefined;
  wordCount: number;
  paragraphCount: number;
  isChecking: boolean;
  onCheckProgress: () => void;
}

const TRAIT_LABELS: Record<keyof FeedbackTraits, string> = {
  hookAndOpening: "Hook & Opening",
  storyStructure: "Story Structure",
  descriptiveDetails: "Descriptive Details",
  transitions: "Transitions",
  voiceAndTone: "Voice & Tone",
  conclusion: "Conclusion",
};

const TRAIT_ORDER: (keyof FeedbackTraits)[] = [
  "hookAndOpening",
  "storyStructure",
  "descriptiveDetails",
  "transitions",
  "voiceAndTone",
  "conclusion",
];

export function RubricSidebar({
  feedback,
  wordCount,
  paragraphCount,
  isChecking,
  onCheckProgress,
}: RubricSidebarProps) {
  const [selectedTrait, setSelectedTrait] = useState<TraitData | null>(null);

  const canCheck = wordCount >= 150 || paragraphCount >= 3;
  const hasBeenChecked = !!feedback;
  const isOnTopic = feedback?.relevance?.isOnTopic ?? true;

  const traits: TraitData[] = TRAIT_ORDER.map((key) => ({
    id: key,
    name: TRAIT_LABELS[key],
    score: feedback?.traits[key]?.score ?? 0,
    working: feedback?.traits[key]?.working ?? [],
    workOn: feedback?.traits[key]?.workOn ?? [],
  }));

  const averageScore = hasBeenChecked
    ? Math.round(
        (traits.reduce((sum, t) => sum + t.score, 0) / traits.length) * 10
      ) / 10
    : 0;

  return (
    <div className="tw-sidebar h-full flex flex-col">
      {/* Header */}
      <div className="tw-sidebar-header">
        <h2 className="tw-h4">Your Progress</h2>
        {hasBeenChecked && isOnTopic && (
          <p className="tw-caption mt-1">
            Average score: {averageScore}/5
          </p>
        )}
      </div>

      {/* Off-Topic Warning - Show instead of traits when essay is off-topic */}
      {hasBeenChecked && !isOnTopic ? (
        <div className="flex-1 flex flex-col">
          <div className="tw-alert tw-alert-warning">
            <span className="tw-alert-icon">⚠</span>
            <div>
              <h3 className="tw-h4 mb-2">Off-Topic Essay</h3>
              <p className="tw-body-sm">
                {feedback?.relevance?.explanation}
              </p>
            </div>
          </div>
          
          <div className="tw-panel mt-4">
            <h4 className="tw-label mb-3">What to do next:</h4>
            <ul className="tw-list tw-list-numbered">
              <li>Re-read the prompt carefully</li>
              <li>Revise your essay to address the prompt</li>
              <li>Click "Check Again" when ready</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Traits List - Only show when on-topic or not yet checked */
        <div className="flex-1 space-y-3 overflow-y-auto">
          {traits.map((trait) => (
            <TraitCard
              key={trait.id}
              trait={trait}
              hasBeenChecked={hasBeenChecked}
              onClick={() => hasBeenChecked && setSelectedTrait(trait)}
            />
          ))}
        </div>
      )}

      {/* Check Progress Button */}
      <div className="mt-6 pt-4 border-t-2 border-border">
        {!canCheck && (
          <p className="tw-caption text-center mb-3">
            Write at least 150 words or 3 paragraphs to check your progress
          </p>
        )}
        <button
          onClick={onCheckProgress}
          disabled={!canCheck || isChecking}
          className={`tw-btn w-full ${canCheck && !isChecking ? "tw-btn-primary" : ""}`}
        >
          {isChecking ? (
            <span className="tw-loading">
              <span>Analyzing</span>
              <span className="tw-loading-dot">.</span>
              <span className="tw-loading-dot">.</span>
              <span className="tw-loading-dot">.</span>
            </span>
          ) : hasBeenChecked ? (
            "Check Again"
          ) : (
            "Check Progress"
          )}
        </button>
      </div>

      {/* Modal */}
      {selectedTrait && (
        <TraitDetailModal
          trait={selectedTrait}
          onClose={() => setSelectedTrait(null)}
        />
      )}
    </div>
  );
}
