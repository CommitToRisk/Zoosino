import { useState, useEffect } from "react";
import { GameHeader } from "@/components/games/GameHeader";
import { GameButton } from "@/components/games/GameButton";
import { PengjackHand } from "@/components/games/pengjack/PengjackHand";
import { GameNotification } from "@/components/games/GameNotification";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";
import penguinImg from "@/assets/pengjack/penguin.svg";
import tableImg from "@/assets/pengjack/table.svg";

type GameState = {
  status: "idle" | "playing" | "won" | "lost" | "bust" | "push" | "blackjack";
  playerCards: (number | string)[];
  dealerCards: (number | string)[];
};

export function PengjackPage() {
  const { updateBalance } = useAuth();

  const [gameState, setGameState] = useState<GameState>({
    status: "idle",
    playerCards: [],
    dealerCards: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const [notification, setNotification] = useState<{ text: string; type: "win" | "lose" | "info" } | null>(null);

  useEffect(() => {
    const fetchCurrentState = async () => {
      try {
        const response = await api.get("/api/pengjack/state");
        const data = response.data;
        
        if (data && data.status === "playing") {
          setGameState(data);
        }
      } catch (error) {
        console.error("Failed to fetch current game state:", error);
      }
    };

    fetchCurrentState();
  }, []);

  useEffect(() => {
    if (gameState.status === "playing" || gameState.status === "idle") return;

    if (gameState.status === "won" || gameState.status === "blackjack") {
      setNotification({ text: "🎉 WINNER! You won 5,000 Points! ", type: "win" });
    } else if (gameState.status === "push") {
      setNotification({ text: "Its a tie. You got 1 consolation point.", type: "info" });
    } else {
      setNotification({ text: "You lost. You got 1 consolation point", type: "info" });
    }
  }, [gameState.status]);

  const closeNotification = () => setNotification(null);

  const handleStart = async () => {
    setIsLoading(true);
    setNotification(null);
    try {
      const response = await api.post("/api/pengjack/start");
      const data = response.data;
      
      setGameState(data);
      if (data.newBalance !== undefined) {
        updateBalance(data.newBalance);
      }
    } catch (error: any) {
      console.error("Start failed:", error);
      const errorMessage = error.response?.data?.error || "Failed to start the game.";
      setNotification({ text: errorMessage, type: "lose" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHit = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/pengjack/hit");
      const data = response.data;
      
      setGameState(data);
      if (data.newBalance !== undefined) {
        updateBalance(data.newBalance);
      }
    } catch (error: any) {
      console.error("Hit failed:", error);
      const errorMessage = error.response?.data?.error || "Failed to hit.";
      setNotification({ text: errorMessage, type: "lose" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStand = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/pengjack/stand");
      const data = response.data;
      
      setGameState(data);
      if (data.newBalance !== undefined) {
        updateBalance(data.newBalance);
      }
    } catch (error: any) {
      console.error("Stand failed:", error);
      const errorMessage = error.response?.data?.error || "Failed to stand.";
      setNotification({ text: errorMessage, type: "lose" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GameNotification
        message={notification?.text || ""}
        type={notification?.type || "info"}
        onClose={closeNotification}
      />

      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto gap-3">
        <GameHeader 
          title="PENGJACK" 
          subtitle="Beat the penguin dealer to win 5,000 pts!" 
        />

        <div className="relative flex flex-col items-center justify-center w-full max-w-3xl">

          <img 
            src={penguinImg}
            alt="Penguin Dealer" 
            className="w-40 h-40 sm:w-48 sm:h-48 z-10 pointer-events-none mt-4 sm:mt-6 mb-4 sm:mb-6 block"
          />

          <div className="relative flex items-center justify-center w-full">
            <img 
              src={tableImg}
              alt="Table"
              className="w-[95%] sm:w-[80%] z-0 pointer-events-none block"
            />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 sm:gap-6">
              {gameState.dealerCards.length > 0 && (
                <PengjackHand title="Dealer" cards={gameState.dealerCards} />
              )}

              {gameState.playerCards.length > 0 && (
                <PengjackHand title="Player" cards={gameState.playerCards} />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 sm:gap-16 w-full z-20 relative mt-8 sm:mt-12">
          {gameState.status === "idle" || gameState.status !== "playing" ? (
            <GameButton onClick={handleStart} disabled={isLoading} className="w-64!">
              {gameState.status === "idle" ? "DEAL CARDS" : "PLAY AGAIN"}
            </GameButton>
          ) : (
            <>
              <button 
                onClick={handleHit} 
                disabled={isLoading} 
                className="w-32 py-3 bg-primary text-text-main font-black text-xl rounded-xl shadow-lg hover:bg-primary-hover active:scale-95 transition-transform disabled:opacity-50"
              >
                HIT
              </button>
              <button 
                onClick={handleStand} 
                disabled={isLoading} 
                className="w-32 py-3 bg-red-600 text-text-main font-black text-xl rounded-xl shadow-lg hover:bg-red-700 active:scale-95 transition-transform disabled:opacity-50"
              >
                STAND
              </button>
            </>
          )}
        </div>

      </div>
    </>
  );
}