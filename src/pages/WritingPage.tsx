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
        <div className="tw-loading">
          <span>Loading your essay</span>
          <span className="tw-loading-dot">.</span>
          <span className="tw-loading-dot">.</span>
          <span className="tw-loading-dot">.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="tw-nav">
          <button
            onClick={() => navigate("/")}
            className="tw-back-link"
          >
            ← Back to prompts
          </button>

          <h1 className="tw-nav-brand">EssayPulse</h1>

          <div className="tw-stats">
            <span>{localWordCount} words</span>
            <span className="tw-stats-divider">—</span>
            <span>{localParagraphCount} paragraphs</span>
            <span className="tw-stats-divider">—</span>
            <span className={`tw-status ${
              saveStatus === "saved" ? "tw-status-saved" : 
              saveStatus === "saving" ? "tw-status-saving" : "tw-status-unsaved"
            }`}>
              {saveStatus === "saved" && "[ SAVED ]"}
              {saveStatus === "saving" && "[ SAVING... ]"}
              {saveStatus === "unsaved" && "[ UNSAVED ]"}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full max-w-[1600px] mx-auto flex gap-6 p-6">
            {/* Left Panel - Editor */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Prompt */}
              <div className="flex-shrink-0 mb-4 tw-card tw-card-secondary">
                <p className="tw-label mb-2">Your Prompt</p>
                <p className="tw-body">
                  {essay.promptText}
                </p>
              </div>

              {/* Editor */}
              <div className="flex-1 min-h-0 tw-editor">
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
