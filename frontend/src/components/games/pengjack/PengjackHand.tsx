import { PengjackCard } from "./PengjackCard";

type PengjackHandProps = {
  title: string;
  cards: (number | string)[];
};

export function PengjackHand({ title, cards }: PengjackHandProps) {
  const calculateScore = () => {
    let score = 0;
    let aces = 0;

    cards.forEach((c) => {
      if (c !== "?") {
        const val = Number(c);
        score += val;
        if (val === 11) aces++;
      }
    });

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  return (
    <div className="flex items-center justify-between w-full max-w-50 sm:max-w-90 relative z-10 gap-2">
      <div className="flex">
        {cards.map((card, idx) => (
          <div
            key={`${title}-${idx}`}
            className={`relative ${idx > 0 ? "-ml-8 sm:-ml-12" : ""}`}
            style={{ zIndex: idx }}
          >
            <PengjackCard value={card} index={idx} />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 sm:gap-2 shrink-0">
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-background border-2 border-border  text-text-main flex items-center justify-center font-black text-xl sm:text-3xl shadow-md">
          {calculateScore()}
        </div>
        <span className="text-text-main text-[10px] sm:text-base font-bold tracking-widest uppercase">
          {title}
        </span>
      </div>
    </div>
  );
}
