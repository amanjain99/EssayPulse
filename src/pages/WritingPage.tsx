import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Editor } from "../components/Editor";
import { RubricSidebar } from "../components/RubricSidebar";
import { useState, useCallback, useRef, useEffect } from "react";

export function WritingPage() {
  const { essayId } = useParams<{ essayId: string }>();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const isCheckingRef = useRef(false);
  const [localWordCount, setLocalWordCount] = useState(0);
  const [localParagraphCount, setLocalParagraphCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const essay = useQuery(api.essays.getEssay, {
    essayId: essayId as Id<"essays">,
  });
  const updateEssay = useMutation(api.essays.updateEssay);
  const generateFeedback = useAction(api.feedback.generateFeedback);

  // Initialize local counts from essay data
  useEffect(() => {
    if (essay) {
      setLocalWordCount(essay.wordCount);
      setLocalParagraphCount(essay.paragraphCount);
    }
  }, [essay]);

  const handleEditorUpdate = useCallback(
    (content: string, wordCount: number, paragraphCount: number) => {
      setLocalWordCount(wordCount);
      setLocalParagraphCount(paragraphCount);
      setSaveStatus("unsaved");

      // Debounce save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        setSaveStatus("saving");
        try {
          await updateEssay({
            essayId: essayId as Id<"essays">,
            content,
            wordCount,
            paragraphCount,
          });
          setSaveStatus("saved");
        } catch (error) {
          console.error("Failed to save:", error);
          setSaveStatus("unsaved");
        }
      }, 1000);
    },
    [essayId, updateEssay]
  );

  const handleCheckProgress = useCallback(async () => {
    if (isCheckingRef.current) return;
    isCheckingRef.current = true;
    setIsChecking(true);
    try {
      await generateFeedback({ essayId: essayId as Id<"essays"> });
    } catch (error) {
      console.error("Failed to generate feedback:", error);
      alert("Failed to generate feedback. Please try again.");
    } finally {
      isCheckingRef.current = false;
      setIsChecking(false);
    }
  }, [essayId, generateFeedback]);

  if (!essay) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex items-center gap-3 text-text-secondary">
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
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
          <span>Loading your essay...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-border bg-bg-primary">
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to prompts</span>
            </button>

            <h1 className="font-serif text-xl font-semibold text-text-primary">
              EssayPulse
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span>{localWordCount} words</span>
              <span className="text-border">•</span>
              <span>{localParagraphCount} paragraphs</span>
              <span className="text-border">•</span>
              <span className={`flex items-center gap-1.5 ${
                saveStatus === "saved" ? "text-success" : 
                saveStatus === "saving" ? "text-warning" : "text-text-secondary"
              }`}>
                {saveStatus === "saved" && (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved
                  </>
                )}
                {saveStatus === "saving" && (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                )}
                {saveStatus === "unsaved" && "Unsaved"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full max-w-[1600px] mx-auto flex gap-6 p-6">
            {/* Left Panel - Editor */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Prompt */}
              <div className="flex-shrink-0 mb-4 p-5 bg-bg-secondary rounded-xl">
                <p className="text-xs uppercase tracking-wider text-text-secondary mb-2">
                  Your Prompt
                </p>
                <p className="font-serif text-lg text-text-primary leading-relaxed">
                  {essay.promptText}
                </p>
              </div>

              {/* Editor */}
              <div className="flex-1 min-h-0 border border-border rounded-xl overflow-hidden shadow-[var(--shadow-soft)]">
                <Editor
                  content={essay.content}
                  onUpdate={handleEditorUpdate}
                  placeholder="Begin your story here. Let your imagination flow..."
                />
              </div>
            </div>

            {/* Right Panel - Rubric Sidebar */}
            <div className="w-80 flex-shrink-0">
              <RubricSidebar
                feedback={essay.feedback}
                wordCount={localWordCount}
                paragraphCount={localParagraphCount}
                isChecking={isChecking}
                onCheckProgress={handleCheckProgress}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

