import { useState } from "react";
import { useAuth } from "@/lib/auth";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { TurtletteWheel } from "@/components/games/turtlette/TurtletteWheel";
import { TurtletteBoard } from "@/components/games/turtlette/TurtletteBoard";
import { GameNotification } from "@/components/games/GameNotification";
import { ROULETTE_ORDER } from "@/components/games/turtlette/TurtletteWheel";
import { GameButton } from "@/components/games/GameButton";
import { GameHeader } from "@/components/games/GameHeader";
import type { BetType } from "@/types";


export function TurtlettePage() {
  usePageTitle("Turtlette");

  const { updateBalance } = useAuth();

  const [selectedBet, setSelectedBet] = useState<BetType | null>(null);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const [rotationDeg, setRotationDeg] = useState(0);
  const [notification, setNotification] = useState<{
    text: string;
    type: "win" | "info";
  } | null>(null);

  const handleSpin = async () => {
    if (selectedBet === null) return;

    setNotification(null);
    setIsSpinning(true);
    setIsZoomed(true);

    try {
      const response = await api.post("/api/turtlette/spin", {
        bet: selectedBet,
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

      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-8 px-4 gap-8">
        
        <GameHeader 
          title="TURTLETTE" 
          subtitle="Pick a lucky number and spin the turtle's wheel!" 
        />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full">
          
          <div className="flex flex-col items-center justify-center flex-1 shrink-0 w-full lg:w-1/2">
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
              selectedNumber={selectedBet}
              onSelect={setSelectedBet}
              disabled={isSpinning || isZoomed}
            />
          </div>
          
        </div>

        <GameButton
          onClick={handleSpin}
          disabled={isSpinning || selectedBet === null || isZoomed}
        >
          {isSpinning ? "Running..." : "SPIN NOW"}
        </GameButton>

      </div>
    </>
  );
}
