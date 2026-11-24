import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { uploadAdminProfile, type UpdateAdminProfileResponse } from './util';

export interface AdminStepProps {
  email: string;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  jobTitle?: string;
  setJobTitle?: Dispatch<SetStateAction<string>>;
  onSuccess: (response: UpdateAdminProfileResponse) => void;
}

export default function AdminStep({
  email,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  jobTitle: _jobTitle,
  setJobTitle: _setJobTitle,
  onSuccess,
}: AdminStepProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim()) {
      setError('Please enter your first name.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await uploadAdminProfile(firstName, lastName);
      onSuccess(response);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to save admin information. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Admin Information"
      subtitle="This is the account you'll use to manage drivers, routes, and settlements."
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (error) setError('');
              }}
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (error) setError('');
              }}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="adminEmail">Email address</label>
          <input
            type="email"
            id="adminEmail"
            value={email || ''}
            disabled
          />
        </div>

        {/* Temporarily commented out Job title field
        <div className="input-group">
          <label htmlFor="jobTitle">Job title</label>
          <input
            type="text"
            id="jobTitle"
            value={_jobTitle}
            onChange={(e) => _setJobTitle?.(e.target.value)}
            disabled={isLoading}
          />
        </div>
        */}

        {error && <p className="form-error">{error}</p>}

        <div className="divider"></div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
