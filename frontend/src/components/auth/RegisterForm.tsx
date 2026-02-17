import { useState } from "react";
import { Link } from "react-router-dom";
import { FormField } from "@/components/form/FormField";

type RegisterFormProps = {
  onSubmit: (data: { username: string; password: string }) => void;
  isLoading: boolean;
  error?: string;
};

export function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      <FormField
        label="Choose Username"
        value={username}
        onChange={setUsername}
        placeholder="CoolPlayer123"
        required
      />

      <FormField
        label="Choose Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Account..." : "Register & Play"}
      </button>

      <div className="mt-4 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Login here
        </Link>
      </div>
    </form>
  );
}