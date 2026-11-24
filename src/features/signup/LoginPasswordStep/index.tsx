import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../components/AuthLayout';
import type { AuthSessionData } from '../CreateAccountStep/util';
import { signInAccount } from './util';

export interface LoginPasswordStepProps {
  email: string;
  accountName?: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  onSuccess: (session: AuthSessionData) => void;
}

export default function LoginPasswordStep({
  email,
  accountName,
  password,
  setPassword,
  onSuccess,
}: LoginPasswordStepProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please go back and enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await signInAccount(email, password);
      onSuccess(response.data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to sign in. Please check your password and try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={accountName ? `Welcome back, ${accountName}` : 'Welcome back'}
      subtitle={
        <>
          Enter your password for <strong>{email || 'your account'}</strong> to continue.
        </>
      }
      showLoginLink={false}
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label htmlFor="login-password" style={{ marginBottom: 0 }}>
              Password
            </label>
            <Link to="/login" className="link" style={{ fontSize: '0.75rem' }}>
              Use a different email
            </Link>
          </div>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              disabled={isLoading}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="divider"></div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
