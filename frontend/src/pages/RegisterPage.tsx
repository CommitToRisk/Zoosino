import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { AuthForm } from '../components/AuthForm';

export const RegisterPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handle(values: { username?: string; password: string }) {
    await auth.register(values.password);
    navigate('/');
  }

  return <AuthForm showUsername={false} submitLabel="Register" onSubmit={handle} />;
};

export default RegisterPage;
