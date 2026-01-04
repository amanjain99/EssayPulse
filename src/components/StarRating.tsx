interface StarRatingProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ score, maxScore = 5, size = "md" }: StarRatingProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`tw-rating ${sizeClasses[size]}`}>
      {Array.from({ length: maxScore }, (_, i) => (
        <span
          key={i}
          className={`tw-rating-star ${i < score ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
