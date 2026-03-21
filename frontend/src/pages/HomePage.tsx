import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { usePageTitle } from "@/hooks/usePageTitle";
import { GameCard } from "@/components/GameCard";

import slotGame from "/sloth_game.webp";
import turtletteGame from "/turtlette_game.webp";
import pengjackGame from "/pengjack_game.webp";

export function HomePage() {
  const { user, isLoading, loginGuest } = useAuth();
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  usePageTitle("Home");

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    try {
      await loginGuest();
    } catch (e) {
      alert("Failed to create guest session");
    } finally {
      setIsGuestLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-10 w-full max-w-6xl mx-auto animate-pulse">
        <div className="mb-16 flex flex-col items-center">
          <div className="h-12 w-64 bg-secondary rounded-lg mb-4"></div>
          <div className="h-6 w-48 bg-secondary rounded-lg mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-80 bg-secondary rounded-xl border border-border/50"></div>
          ))}
        </div>

        <div className="bg-secondary/20 border-2 border-border/20 rounded-2xl h-30 max-w-4xl mx-auto"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="p-4 sm:p-10 text-center w-full max-w-6xl mx-auto">
        
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-text-main mb-4 tracking-tight">
            {user.isGuest ? "Welcome" : "Welcome back"}, <span className="text-primary">{user.username}</span>!
          </h1>
          <p className="text-text-muted text-lg mb-8">Ready to try your luck today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          
          <GameCard 
            title="Sloth"
            description="Let the sloth drop fruit and win big!"
            imgSrc={slotGame}
            linkTo="/sloth"
          />
          
          <GameCard 
            title="Turtlette"
            description="Spin the turtlette and watch your fortune grow!"
            imgSrc={turtletteGame}
            linkTo="/turtlette"
          />

          <GameCard 
            title="PengJack"
            description="Beat the penguin dealer to win a prize!"
            imgSrc={pengjackGame}
            linkTo="/pengjack"
          />

        </div>

        <div className="bg-secondary/40 border-2 border-border/50 rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-xl font-black text-text-main mb-3 uppercase">
              Become #1
            </h3>
            <p className="text-text-muted">
              Climb up the leaderboard by playing games.
            </p>
          </div>
          <Link 
            to="/leaderboards" 
            className="shrink-0 px-8 py-4 bg-transparent border-2 border-primary text-primary font-black text-md rounded-xl hover:bg-primary/50 hover:text-white transition-colors uppercase tracking-widest whitespace-nowrap"
          >
            View Ranking
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">ZOOSINO</h1>
        <p className="text-xl text-text-muted">The best casino experience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        <div className="bg-secondary p-8 rounded-xl border border-border flex flex-col items-center text-center shadow-lg">
          <h2 className="text-2xl font-bold text-text-main mb-4">Full Experience</h2>
          <p className="text-text-muted mb-8 grow">
            Save your progress, deposit funds, and compete in leaderboards.
          </p>
          <div className="w-full space-y-3">
            <Link 
              to="/login"
              className="block w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded transition-all"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="block w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-4 rounded transition-all"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="bg-secondary p-8 rounded-xl border border-dashed border-border flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-text-main mb-4">Just Browsing?</h2>
          <p className="text-text-muted mb-8 grow">
            Jump straight into the action with a temporary guest account. No strings attached.
          </p>
          <button
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-all disabled:opacity-50"
          >
            {isGuestLoading ? "Creating Guest Session..." : "Play as Guest"}
          </button>
        </div>

      </div>
    </div>
  );
}