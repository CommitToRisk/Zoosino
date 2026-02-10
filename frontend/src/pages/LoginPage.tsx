import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { FormField } from "@/components/form/FormField";

export function LoginPage() {
  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState("");
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ phrase });
      
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
          <h2 className="text-3xl font-bold text-primary mb-2">Change account?</h2>
          <p className="text-text-muted">Login to continue your winning streak</p>
        </div>

        {error && (
          <div className="bg-red-500/25 border border-red-700 text-text-main text-sm p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <FormField
          label="Your idenification phrase:"
          type="text"
          value={phrase}
          onChange={setPhrase}
          placeholder="AwesomeGambler67"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-primary hover:bg-primary-hover text-white text-lg font-bold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed "
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
       
      </form>
    </div>
  );
}