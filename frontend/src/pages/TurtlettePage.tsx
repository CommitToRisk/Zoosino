import { useState } from "react";
import { useAuth } from "@/lib/auth";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { TurtletteWheel } from "@/components/games/turtlette/TurtletteWheel";
import { TurtletteBoard } from "@/components/games/turtlette/TurtletteBoard";
import { GameNotification } from "@/components/games/GameNotification";
import { ROULETTE_ORDER } from "@/components/games/turtlette/TurtletteWheel";


export function TurtlettePage() {
  usePageTitle("Turtlette");

  const { updateBalance } = useAuth();

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const [rotationDeg, setRotationDeg] = useState(0);
  const [notification, setNotification] = useState<{
    text: string;
    type: "win" | "info";
  } | null>(null);

  const handleSpin = async () => {
    if (selectedNumber === null) return;

    setNotification(null);
    setIsSpinning(true);
    setIsZoomed(true);

    try {
      const response = await api.post("/api/turtlette/spin", {
        betNumber: selectedNumber,
      });
      const data = response.data;

      const targetIndex = ROULETTE_ORDER.indexOf(data.winningNumber);
      const sliceAngle = 360 / 37;
      const targetAngle = (180 - targetIndex * sliceAngle + 360) % 360;
      const currentMod = rotationDeg % 360;
      const spinAmount = 1800 + ((360 - currentMod + targetAngle) % 360);

      setRotationDeg((prev) => prev + spinAmount);

      setTimeout(() => {
        setIsSpinning(false);
        setWinningNumber(data.winningNumber);
        updateBalance(data.newBalance);

        if (data.winAmount > 1) {
          setNotification({
            text: `🎉 WINNER! Turtle picked ${data.winningNumber}. You won 10,000 Points!`,
            type: "win",
          });
        } else {
          setNotification({
            text: `Turtle picked ${data.winningNumber}. You got 1 consolation point.`,
            type: "info",
          });
        }

        setIsZoomed(false);
      }, 4000);
    } catch (error) {
      console.error("Spin failed:", error);
      setIsSpinning(false);
      setIsZoomed(false);
      alert("Something went wrong with the server.");
    }
  };

  const closeNotification = () => {
    setNotification(null);
    setIsZoomed(false);
  };

  return (
    <>
      <GameNotification
        message={notification?.text || ""}
        type={notification?.type || "lose"}
        onClose={closeNotification}
      />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full max-w-5xl mx-auto py-6">
        <div className="flex flex-col items-center justify-center flex-1 shrink-0 w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6 uppercase tracking-wider text-center">
            Turtlette
          </h1>
          <TurtletteWheel
            rotationDeg={rotationDeg}
            isZoomed={isZoomed}
            isSpinning={isSpinning}
            winningNumber={winningNumber}
            spinDurationMs={4000}
            turtlePopOutMs={3500}
          />
        </div>

        <div className="flex flex-col items-center justify-center flex-1 shrink-0 w-full lg:w-1/2 z-10">
          <TurtletteBoard
            selectedNumber={selectedNumber}
            onSelect={setSelectedNumber}
            disabled={isSpinning || isZoomed}
          />

          <button
            onClick={handleSpin}
            disabled={isSpinning || selectedNumber === null || isZoomed}
            className="mt-4 lg:mt-6 bg-primary hover:bg-primary-hover text-background text-xl sm:text-2xl font-black uppercase tracking-widest py-3 sm:py-4 w-full max-w-lg rounded shadow-lg transition-transform transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSpinning ? "Running..." : "SPIN NOW"}
          </button>
        </div>
      </div>
    </>
  );
}
