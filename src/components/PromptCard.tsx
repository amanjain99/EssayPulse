import { useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface PromptCardProps {
  id: string;
  text: string;
}

export function PromptCard({ id, text }: PromptCardProps) {
  const navigate = useNavigate();
  const createEssay = useMutation(api.essays.createEssay);

  const handleClick = async () => {
    try {
      const essayId = await createEssay({ promptId: id, promptText: text });
      navigate(`/write/${essayId}`);
    } catch (error) {
      console.error("Failed to create essay:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left p-5 bg-bg-primary rounded-xl border border-border 
                 hover:border-accent-light hover:shadow-[var(--shadow-soft)] 
                 transition-all duration-200 group cursor-pointer"
    >
      <p className="font-serif text-text-primary leading-relaxed group-hover:text-accent transition-colors">
        {text}
      </p>
      <div className="mt-3 flex items-center gap-2 text-accent-light text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Start writing</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </button>
  );
}

