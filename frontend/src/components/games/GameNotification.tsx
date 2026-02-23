import { useEffect } from "react";

type GameNotificationProps = {
  message: string;
  type: "win" | "lose";
  onClose: () => void;
  autoCloseMs?: number;
};

export function GameNotification({ message, type, onClose, autoCloseMs = 4000 }: GameNotificationProps) {

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(onClose, autoCloseMs);

    return () => clearTimeout(timer);
  }, [message, onClose, autoCloseMs]);

  if (!message) return null;

  return (
    <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-100 px-6 py-4 rounded-xl border-2 min-w-75 text-center font-bold text-lg transition-all ${
      type === "win" 
        ? "bg-primary text-white border-primary-hover shadow-primary/50" 
        : "bg-warning text-text-main border-warning-hover shadow-warning/50"
    }`}>
      {message}
      <button 
        onClick={onClose}
        className="absolute -top-3 -right-3 bg-secondary text-text-main border border-border rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-border transition-colors shadow-md"
      >
        ✕
      </button>
    </div>
  );
}