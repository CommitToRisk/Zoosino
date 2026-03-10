import React, {useEffect} from "react";

type GameButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function GameButton({ children, onClick, disabled = false, className = "" }: GameButtonProps) {

  useEffect(() => {
  
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
          event.preventDefault(); 
  
          if (!disabled) {
            onClick();
          }
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [disabled, onClick]);

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