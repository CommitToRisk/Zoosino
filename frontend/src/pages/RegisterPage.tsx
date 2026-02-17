import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { FormField } from "@/components/form/FormField";
import { BackToHome } from "@/components/navigation/BackToHome";
import { usePageTitle } from "@/components/usePageTitle";

export function RegisterPage() {

  usePageTitle("Register");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
    }

    try {
      await register({ username, password });
      
      navigate("/"); 
    } catch (err: any) {
      if (err.response?.status === 409) {
          setError("Username is already taken.");
      } else {
          setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md mx-auto bg-secondary p-8 rounded-xl shadow-md border border-border"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Create Account</h2>
          <p className="text-text-muted">Start your journey at Zoosino today</p>
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
          placeholder="AwesomeGambler67"
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="verysecurepassword"
        />

        <FormField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="verysecurepassword"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-primary hover:bg-primary-hover text-white text-lg font-bold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-bold">
              Login here
            </Link>
          </p>
        </div>
      </form>

      <BackToHome />
    </div>
  );
}