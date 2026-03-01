import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

type GameNotificationProps = {
  message: string;
  type: "win" | "lose" | "info";
  onClose: () => void;
  autoCloseMs?: number;
};

export function GameNotification({
  message,
  type,
  onClose,
  autoCloseMs = 3000,
}: GameNotificationProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (message) {
      setShouldRender(true);

      if (type !== "win") {
        const timer = setTimeout(onClose, autoCloseMs);
        return () => clearTimeout(timer);
      }
    } else {
      setShouldRender(false);
    }
  }, [message, type, onClose, autoCloseMs]);

  useEffect(() => {
    if (message && type === "win") {
      const duration = 750;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 20,
        spread: 360,
        ticks: 60,
        zIndex: 160,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [message, type]);

  if (!shouldRender || !message) return null;
  let typeStyles = "";

  switch (type) {
    case "win":
      typeStyles = "bg-background border-primary text-primary";
      break;
    case "lose":
      typeStyles = "bg-background border-warning text-warning";
      break;
    case "info":
    default:
      typeStyles = "bg-secondary border-border text-text-main";
      break;
  }

  return (
    <>
      <div className="fixed top-8 inset-x-0 z-150 pointer-events-none flex justify-center px-4">
        <div
          className={`pointer-events-auto max-w-[95vw] px-5 py-2.5 rounded-2xl border backdrop-blur-md shadow-lg animate-slide-down flex items-center gap-3 transition-colors ${typeStyles}`}
        >
          <span className="font-semibold text-sm sm:text-base tracking-wide text-center">
            {message}
          </span>
          <button
            onClick={onClose}
            className="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-50 hover:opacity-100 hover:bg-text-main/10 transition-colors shrink-0"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
