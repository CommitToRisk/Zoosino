import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { usePageTitle } from "@/hooks/usePageTitle";
import { RefreshButton } from "@/components/leaderboard/RefreshButton";
import { LeaderboardRow } from "@/components/leaderboard/LeaderboardRow";

type LeaderboardEntry = {
  username: string;
  balance: number;
};

type LeaderboardResponse = {
  leaderboard: LeaderboardEntry[];
  myPosition: number | null;
};

export function LeaderboardPage() {
  usePageTitle("Leaderboard");
  const { user } = useAuth();
  
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaderboard = async () => {
    setError("");
    try {
      const response = await api.get("/api/leaderboard");
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
      setError("Could not load the leaderboard. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-3xl mx-auto w-full py-6 flex flex-col gap-6">
      
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary uppercase tracking-wider text-center w-full">
          Leaderboard
        </h1>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-text-muted uppercase tracking-wider font-bold mb-1">
              My Position
            </span>
            <div className="text-xl sm:text-2xl font-black text-text-main">
              {user?.isGuest ? (
                <span className="text-warning">Unranked</span>
              ) : (
                data?.myPosition ? `#${data.myPosition}` : "Unranked"
              )}
            </div>
            {user?.isGuest && (
              <span className="text-xs text-warning/80 mt-1 max-w-50 leading-tight">
                Guests are not ranked. Register to join the leaderboard!
              </span>
            )}
          </div>
          
          <RefreshButton onRefresh={fetchLeaderboard} cooldownSeconds={5} />
        </div>
      </div>

      {error && (
        <div className="bg-warning/20 border border-warning text-warning p-4 rounded-lg text-center font-bold">
          {error}
        </div>
      )}

      <div className="flex flex-col">
        {isLoading && !data ? (
          <div className="text-center text-text-muted py-10 animate-pulse font-bold">
            Loading heroes...
          </div>
        ) : (
          data?.leaderboard.map((entry, index) => {
            const rank = index + 1;
            const isMe = user?.username === entry.username;

            return (
              <LeaderboardRow 
                key={entry.username} 
                rank={rank}
                username={entry.username}
                balance={entry.balance}
                isMe={isMe}
              />
            );
          })
        )}
        
        {!isLoading && data?.leaderboard.length === 0 && (
          <div className="text-center text-text-muted py-10">
            No one is here yet. Be the first!
          </div>
        )}
      </div>

    </div>
  );
}