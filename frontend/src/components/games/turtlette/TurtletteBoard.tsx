import type { BetType } from "@/types";

type TurtletteBoardProps = {
  selectedNumber: BetType | null;
  onSelect: (num: BetType) => void;
  disabled: boolean;
};

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

const BoardButton = ({ label, value, colorClass, isSelected, onClick, disabled, className = "" }: any) => (
  <button
    onClick={() => onClick(value)}
    disabled={disabled}
    className={`py-2 rounded-lg font-black transition-all ${className} ${colorClass} text-white ${
      isSelected && 'ring-2 ring-text-main/85'
    }`}
  >
    {label}
  </button>
);

export function TurtletteBoard({ selectedNumber, onSelect, disabled }: TurtletteBoardProps) {
  const numbers = Array.from({ length: 37 }, (_, i) => i);

  const getNumberColor = (num: number) => {
    if (num === 0) return "bg-primary/20 text-primary"
    return RED_NUMBERS.includes(num) ? "bg-red-500" : "bg-black/80";
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col shrink-0 px-2 sm:px-0 gap-3">
      
      <div className="grid grid-cols-4 gap-2">
        <BoardButton label="RED" value="red" colorClass="bg-red-500/80" isSelected={selectedNumber === "red"} onClick={onSelect} disabled={disabled} className="text-xs font-black" />
        <BoardButton label="BLACK" value="black" colorClass="bg-black/80" isSelected={selectedNumber === "black"} onClick={onSelect} disabled={disabled} className="text-xs font-black" />
        <BoardButton label="EVEN" value="even" colorClass="bg-black/50" isSelected={selectedNumber === "even"} onClick={onSelect} disabled={disabled} className="text-xs font-black" />
        <BoardButton label="ODD" value="odd" colorClass="bg-black/50" isSelected={selectedNumber === "odd"} onClick={onSelect} disabled={disabled} className="text-xs font-black" />
      </div>

      <BoardButton 
        label="0" value={0} colorClass="bg-primary/80 text-primary" 
        isSelected={selectedNumber === 0} onClick={onSelect} disabled={disabled} className="w-full text-sm" 
      />

      <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5">
        {numbers.slice(1).map((num) => (
          <BoardButton
            key={num}
            label={num}
            value={num}
            colorClass={getNumberColor(num)}
            isSelected={selectedNumber === num}
            onClick={onSelect}
            disabled={disabled}
            className="text-xs sm:text-sm"
          />
        ))}
      </div>
    </div>
  );
}