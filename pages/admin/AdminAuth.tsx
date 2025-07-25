
import React, { useState } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../../components/Button';

export const AdminAuth: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const { translate } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(translate('admin_incorrectPassword'));
      setPassword('');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-creamy-beige">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-brandAccent-800">
          {translate('admin_loginTitle')}
        </h1>
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-4">
            <label htmlFor="password-input" className="block text-sm font-medium text-stone-700">
              {translate('admin_password')}
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500"
              placeholder={translate('admin_enterPassword')}
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
          <Button type="submit" variant="primary" fullWidth>
            {translate('admin_login')}
          </Button>
        </form>
      </div>
    </div>
  );
};
