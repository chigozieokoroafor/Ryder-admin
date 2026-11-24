import React, { useState } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { checkEmailAccount } from './util';

export default function EmailStep({ email, setEmail, onNext }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your work email.');
      return;
    }

    setIsLoading(true);
    try {
      await checkEmailAccount(email);
      onNext();
    } catch (err) {
      setError(err.message || 'Unable to check account status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create your organisation account"
      subtitle="Use your work email — it helps Riyder verify your organisation."
      showLoginLink={true}
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
            {isLoading ? 'Checking...' : 'Next: Verify email'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
