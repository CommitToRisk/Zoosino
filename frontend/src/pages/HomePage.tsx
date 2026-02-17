import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function HomePage() {
  const { user, isLoading, loginGuest } = useAuth();
  const [isGuestLoading, setIsGuestLoading] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-primary animate-pulse">Loading Casino...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="p-10 text-center max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-text-main mb-4">
          {user.isGuest ? "Welcome" : "Welcome back"} <span className="text-primary">{user.username}</span>!
        </h1>
        <p className="text-text-muted mb-8">Ready to try your luck today?</p>
        
        <p>Under construction</p>
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