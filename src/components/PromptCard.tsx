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
      className="tw-card tw-card-interactive tw-prompt-card w-full text-left"
    >
      <p className="tw-prompt-text">
        {text}
      </p>
      <p className="tw-prompt-cta">→ Begin writing</p>
    </button>
  );
}
