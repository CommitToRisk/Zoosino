import { useState, useEffect } from "react";

type RefreshButtonProps = {
  onRefresh: () => Promise<void>;
  cooldownSeconds?: number;
};

export function RefreshButton({ onRefresh, cooldownSeconds = 5 }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleClick = async () => {
    if (cooldown > 0 || isRefreshing) return;
    
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
    setCooldown(cooldownSeconds);
  };

  return (
    <button
      onClick={handleClick}
      disabled={cooldown > 0 || isRefreshing}
      className={`px-4 py-2 rounded font-bold transition-all border ${
        cooldown > 0 || isRefreshing
          ? "bg-secondary text-text-muted border-border cursor-not-allowed"
          : "bg-primary text-background border-primary hover:bg-primary-hover active:scale-95"
      }`}
    >
      {isRefreshing ? "Loading..." : cooldown > 0 ? `Wait ${cooldown}s` : "Refresh"}
    </button>
  );
}