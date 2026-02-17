import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { FormField } from "@/components/form/FormField";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ username, password });
      
      navigate("/"); 
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md mx-auto bg-secondary p-8 rounded-xl shadow-md border border-border"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
          <p className="text-text-muted">Login to continue your winning streak</p>
        </div>

        {error && (
          <div className="bg-red-500/25 border border-red-700 text-text-main text-sm p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <FormField
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
          placeholder="Your username"
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-primary hover:bg-primary-hover text-white text-lg font-bold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-bold">
              Register here
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
}