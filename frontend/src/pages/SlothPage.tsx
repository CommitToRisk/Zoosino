import { useState } from "react";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/lib/auth";
import { SlothMachine } from "@/components/games/sloth/SlothMachine";
import { GameNotification } from "@/components/games/GameNotification";

export function SlothPage() {
  usePageTitle("Sloth");
  
  const { updateBalance } = useAuth(); 
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [fruits, setFruits] = useState<number[] | null>(null);
  
  const [notification, setNotification] = useState<{
    text: string;
    type: "win" | "info";
  } | null>(null);

  const handlePlay = async () => {
    if (isLocked) return;
    
    setNotification(null);
    setIsSpinning(true);
    setIsLocked(true);

    try {
      const response = await api.post("/api/sloth/spin");
      const data = response.data;
      
      setTimeout(() => {
        setFruits(data.fruits);
        setIsSpinning(false);

        setTimeout(() => {
          updateBalance(data.newBalance); 

          if (data.winAmount > 1) {
            setNotification({ 
              text: `JACKPOT! The Sloth dropped 3 matching fruits! You won 100,000 Points!`, 
              type: "win" 
            });
          } else {
            setNotification({ 
              text: `No match. The Sloth gave you 1 consolation point.`, 
              type: "info" 
            });
          }
          
          setIsLocked(false);

        }, 1000);

      }, 1000);

    } catch (error) {
      console.error("Spin failed:", error);
      setIsSpinning(false);
      setIsLocked(false);
      alert("Something went wrong with the server.");
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <GameNotification
        message={notification?.text || ""}
        type={notification?.type || "info"}
        onClose={closeNotification}
      />

      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-8 px-4 gap-8">
        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6 uppercase tracking-wider text-center">
            SLOTH
          </h1>
          <p className="text-text-muted font-medium">
            Matching 3 fruits wins <strong className="text-primary">100,000 pts</strong>.
          </p>
        </div>

        <SlothMachine fruits={fruits} isSpinning={isSpinning} />

        <button
          onClick={handlePlay}
          disabled={isLocked}
          className={`mt-4 px-12 py-4 rounded-xl font-black text-xl uppercase tracking-widest transition-transform transform ${
            isLocked
              ? "bg-secondary text-text-muted opacity-50 cursor-not-allowed"
              : "bg-primary text-background hover:bg-primary-hover active:scale-95 shadow-lg"
          }`}
        >
          {isLocked ? "Dropping..." : "Drop Fruits"}
        </button>
        
      </div>
    </>
  );
}