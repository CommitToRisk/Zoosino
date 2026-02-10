import React, { useState } from 'react';

type Props = {
  showUsername?: boolean;
  submitLabel?: string;
  onSubmit: (values: { username?: string; password: string }) => Promise<any> | any;
};

export const AuthForm: React.FC<Props> = ({ showUsername = true, submitLabel = 'Submit', onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit({ username: showUsername ? username : undefined, password });
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Request failed';
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-secondary p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-text-main">{submitLabel}</h2>

      {showUsername && (
        <label className="block mb-3">
          <div className="text-sm text-text-muted mb-1">Username</div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded border border-gray-200 bg-white text-text-main"
            placeholder="Choose a username"
            required
          />
        </label>
      )}

      <label className="block mb-4">
        <div className="text-sm text-text-muted mb-1">Password</div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded border border-gray-200 bg-white text-text-main"
          type="password"
          placeholder="Your password"
          required
        />
      </label>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        style={{ backgroundColor: 'var(--color-primary)' }}
        className="w-full text-white py-2 px-4 rounded hover:opacity-95 disabled:opacity-60"
      >
        {loading ? 'Please wait…' : submitLabel}
      </button>
    </form>
  );
};

export default AuthForm;
