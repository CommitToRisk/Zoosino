import React from "react";

type GameButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function GameButton({ children, onClick, disabled = false, className = "" }: GameButtonProps) {
  return (
    <div className="flex justify-center w-full">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-12 py-4 rounded-xl font-black text-xl uppercase tracking-widest transition-transform transform ${
          disabled
            ? "bg-secondary text-text-muted opacity-50 cursor-not-allowed"
            : "bg-primary text-background hover:bg-primary-hover active:scale-95 shadow-lg"
        } ${className}`}
      >
        {children}
      </button>
    </div>
  );
}