type TurtletteBoardProps = {
  selectedNumber: number | null;
  onSelect: (num: number) => void;
  disabled: boolean;
};

export function TurtletteBoard({ selectedNumber, onSelect, disabled }: TurtletteBoardProps) {
  const numbers = Array.from({ length: 37 }, (_, i) => i);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col shrink-0">
      <button
        onClick={() => onSelect(0)}
        disabled={disabled}
        className={`w-full py-1.5 sm:py-2 mb-1 sm:mb-2 rounded text-sm sm:text-base font-bold transition-colors border ${
          selectedNumber === 0 
            ? "bg-primary text-background border-primary" 
            : "bg-secondary text-text-main border-border hover:bg-border/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        0
      </button>

      <div className="grid grid-cols-6 sm:grid-cols-9 gap-1 sm:gap-1.5">
        {numbers.slice(1).map((num) => (
          <button
            key={num}
            onClick={() => onSelect(num)}
            disabled={disabled}
            className={`py-1.5 sm:py-2 rounded text-sm sm:text-base font-bold transition-colors border ${
              selectedNumber === num 
                ? "bg-primary text-background border-primary" 
                : "bg-secondary text-text-main border-border hover:bg-border/50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}