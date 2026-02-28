type LeaderboardRowProps = {
  rank: number;
  username: string;
  balance: number;
  isMe: boolean;
};

export function LeaderboardRow({ rank, username, balance, isMe }: LeaderboardRowProps) {
  
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: 
        return "bg-yellow-500 text-black shadow-sm shadow-yellow-500/40";
      case 2: 
        return "bg-slate-300 text-black shadow-sm shadow-slate-300/40";
      case 3: 
        return "bg-amber-600 text-white shadow-sm shadow-amber-600/40";
      default: 
        return "text-text-muted bg-transparent";
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-3 sm:p-4 mb-2 rounded-lg border transition-colors ${
        isMe 
          ? "bg-primary/10 border-primary text-primary font-bold shadow-sm" 
          : "bg-secondary border-border text-text-main hover:bg-border/30"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span 
          className={`flex items-center justify-center shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full font-black ${
            rank <= 3 ? "text-sm sm:text-base" : "text-lg sm:text-xl"
          } ${getRankStyle(rank)}`}
        >
          {rank}
        </span>
        
        <span className="text-base sm:text-lg truncate max-w-37.5 sm:max-w-xs">
          {username}
        </span>
      </div>
      
      <div className="text-right whitespace-nowrap">
        <span className="text-base sm:text-lg">{balance.toLocaleString()}</span>
        <span className="text-xs sm:text-sm ml-1 text-primary font-bold">Points</span>
      </div>
    </div>
  );
}