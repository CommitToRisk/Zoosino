import { useState, useEffect } from "react";
import { GameHeader } from "@/components/games/GameHeader";
import { GameButton } from "@/components/games/GameButton";
import { PengjackHand } from "@/components/games/pengjack/PengjackHand";
import { GameNotification } from "@/components/games/GameNotification";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";

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
      setNotification({ text: `YOU WON 5,000 PTS! (${gameState.status.toUpperCase()})`, type: "win" });
    } else if (gameState.status === "push") {
      setNotification({ text: "PUSH! IT'S A TIE.", type: "info" });
    } else {
      setNotification({ text: `YOU LOST! (${gameState.status.toUpperCase()})`, type: "lose" });
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

      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-8 px-4 gap-8">
        <GameHeader 
          title="PENGJACK" 
          subtitle="Beat the penguin dealer to win 5,000 pts!" 
        />

        <div className="w-full max-w-3xl bg-[#2a6645] p-8 sm:p-16 rounded-xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between min-h-125 relative border-8 border-[#1c412e]">
          
          <div className="relative w-full flex justify-center mt-4">
            <div className="absolute -top-16 sm:-top-24 w-40 h-40 sm:w-48 sm:h-48 z-0 opacity-80 pointer-events-none">
               <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                 <span className="text-5xl"> PENGUIN PIC HERE </span>
               </div>
            </div>

            {gameState.dealerCards.length > 0 && (
              <PengjackHand title="Dealer" cards={gameState.dealerCards} />
            )}
          </div>

          <div className="flex-1 w-full min-h-20 sm:min-h-30"></div>

          <div className="w-full flex flex-col items-center gap-8">
            
            {gameState.playerCards.length > 0 && (
              <PengjackHand title="Player" cards={gameState.playerCards} />
            )}

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-16 mt-4 z-20 relative min-h-20 sm:h-20">
              {gameState.status === "idle" || gameState.status !== "playing" ? (
                <GameButton onClick={handleStart} disabled={isLoading} className="w-64!">
                  {gameState.status === "idle" ? "DEAL CARDS" : "PLAY AGAIN"}
                </GameButton>
              ) : (
                <>
                  <button 
                    onClick={handleHit} 
                    disabled={isLoading} 
                    className="w-32 py-3 bg-primary text-text-secondary font-black text-xl rounded-xl shadow-lg hover:bg-primary-hover active:scale-95 transition-transform disabled:opacity-50"
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
        </div>
      </div>
    </>
  );
}