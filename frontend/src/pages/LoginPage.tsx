import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function LoginPage() {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-secondary p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-text-main">Login</h2>

      
    </form>
  );
};
