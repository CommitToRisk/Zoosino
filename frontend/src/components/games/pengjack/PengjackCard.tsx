type PengjackCardProps = {
  value: number | string;
  index: number;
};

export function PengjackCard({ value, index }: PengjackCardProps) {
  const isHidden = value === "?";

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
        className={`w-12 h-18 sm:w-20 sm:h-28 rounded-lg sm:rounded-xl shadow-lg border-2 flex items-center justify-center text-lg sm:text-2xl font-black transition-transform hover:-translate-y-2 animate-card-deal ${
          isHidden
            ? "bg-secondary border-border text-transparent"
            : "bg-background border-border text-text-main"
        }`}
        style={{
          animationDelay: `${index * 150}ms`,
          opacity: 0,
        }}
      >
        {!isHidden && value}
      </div>
    </>
  );
}
