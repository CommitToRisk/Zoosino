import { useState } from "react";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/lib/auth";
import { SlothMachine } from "@/components/games/sloth/SlothMachine";
import { GameNotification } from "@/components/games/GameNotification";
import { GameHeader } from "@/components/games/GameHeader";
import { GameButton } from "@/components/games/GameButton";

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

        }, 800);

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
        
        <GameHeader 
          title="SLOTH" 
          subtitle={
            <>
              Matching 3 fruits wins <strong className="text-primary">100,000 pts</strong>.
            </>
          } 
        />
        <SlothMachine fruits={fruits} isSpinning={isSpinning} />
        <GameButton 
          onClick={handlePlay} 
          disabled={isLocked}
        >
          {isLocked ? "Dropping..." : "Drop Fruits"}
        </GameButton>
        
      </div>
    </>
  );
}