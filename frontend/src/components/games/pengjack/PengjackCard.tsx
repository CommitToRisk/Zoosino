type PengjackCardProps = {
  value: number | string;
  index: number;
};

export function PengjackCard({ value, index }: PengjackCardProps) {
  const isHidden = value === "?";
  const cardNumber = value === 11 ? "A" : value
  return (
    <>
      <style>{`
      @keyframes slideInTop {
        0% { transform: translateY(-50px) scale(0.9); opacity: 0; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      .animate-card-deal {
        animation: slideInTop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
    `}</style>
      <div
        className={`w-12 h-18 sm:w-20 sm:h-28 rounded-lg sm:rounded-xl shadow-lg border-2 flex items-center justify-center transition-transform hover:-translate-y-2 animate-card-deal relative overflow-hidden ${
          isHidden
            ? "bg-secondary border-border"
            : "bg-background border-border"
        }`}
        style={{
          animationDelay: `${index * 150}ms`,
          opacity: 0,
        }}
      >
        {!isHidden && (
          <>
            <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 text-[10px] sm:text-xs font-bold leading-none text-text-main/80 select-none">
              {cardNumber}
            </div>

            <div className="text-2xl sm:text-4xl font-black text-text-main opacity-10 select-none">
              {cardNumber}
            </div>

            <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 text-[10px] sm:text-xs font-bold leading-none text-text-main/80 rotate-180 select-none">
              {cardNumber}
            </div>
          </>
        )}

        {isHidden && (
          <div className="w-full h-full p-1 sm:p-2">
            <div className="w-full h-full border-border/30 rounded-md bg-background flex items-center justify-center">
              <span className="text-[10px] opacity-20 font-bold text-3xl sm:text-5xl">
                Z
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
