import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { AuthForm } from '../components/AuthForm';

export const LoginPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handle(values: { username?: string; password: string }) {
    await auth.login(values.username, values.password);
    navigate('/');
  }

  return <AuthForm showUsername submitLabel="Log in" onSubmit={handle} />;
};

export default LoginPage;
