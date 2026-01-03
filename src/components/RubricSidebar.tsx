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
    <div className="h-full flex flex-col bg-bg-secondary rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-serif text-xl font-semibold text-text-primary">
          Your Progress
        </h2>
        {hasBeenChecked && isOnTopic && (
          <p className="text-sm text-text-secondary mt-1">
            Average score: {averageScore}/5
          </p>
        )}
      </div>

      {/* Off-Topic Warning - Show instead of traits when essay is off-topic */}
      {hasBeenChecked && !isOnTopic ? (
        <div className="flex-1 flex flex-col">
          <div className="p-5 bg-warning/10 border border-warning/30 rounded-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-serif font-semibold text-text-primary text-lg mb-2">
                Off-Topic Essay
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feedback?.relevance?.explanation}
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-bg-primary rounded-xl border border-border">
            <h4 className="font-medium text-text-primary text-sm mb-2">What to do next:</h4>
            <ul className="text-sm text-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">1.</span>
                <span>Re-read the prompt carefully</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">2.</span>
                <span>Revise your essay to address the prompt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">3.</span>
                <span>Click "Check Again" when ready</span>
              </li>
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
      <div className="mt-6 pt-6 border-t border-border">
        {!canCheck && (
          <p className="text-sm text-text-secondary text-center mb-3">
            Write at least 150 words or 3 paragraphs to check your progress
          </p>
        )}
        <button
          onClick={onCheckProgress}
          disabled={!canCheck || isChecking}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200
            ${
              canCheck && !isChecking
                ? "bg-accent text-bg-primary hover:bg-accent/90 shadow-[var(--shadow-soft)]"
                : "bg-border text-text-secondary cursor-not-allowed"
            }`}
        >
          {isChecking ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing...
            </span>
          ) : hasBeenChecked ? (
            "Check Again"
          ) : (
            "Check Your Progress"
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
