import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { checkEmailAccount, type CheckAuthData } from './util';

export interface EmailStepProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  mode?: 'signup' | 'login';
  onCheckComplete: (result: CheckAuthData) => void;
}

export default function EmailStep({
  email,
  setEmail,
  mode = 'signup',
  onCheckComplete,
}: EmailStepProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const isLoginMode = mode === 'login';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your work email.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await checkEmailAccount(email);
      onCheckComplete({
        accountExist: Boolean(response?.data?.accountExist),
        name: response?.data?.name,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to check account status. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={isLoginMode ? 'Sign in to your account' : 'Create your organisation account'}
      subtitle={
        isLoginMode
          ? 'Enter your work email to access your Riyder organisation dashboard.'
          : 'Use your work email — it helps Riyder verify your organisation.'
      }
      showLoginLink={!isLoginMode}
      showSignupLink={isLoginMode}
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@organisation.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Continue'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
