import React, { useState } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { validatePassword, isPasswordFullyValid } from './util';

export default function PasswordStep({ password, setPassword, onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const criteria = validatePassword(password);
  const isValid = isPasswordFullyValid(criteria);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const renderRequirement = (label, isMet) => {
    if (password === '') {
      return (
        <span className="req-item text-gray">
          <span className="req-icon">•</span> {label}
        </span>
      );
    }
    return isMet ? (
      <span className="req-item text-green">
        <svg className="req-icon-svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {label}
      </span>
    ) : (
      <span className="req-item text-red">
        <svg className="req-icon-svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        {label}
      </span>
    );
  };

  return (
    <AuthLayout 
      title="Create your password"
      subtitle="Keep your organisation's account secure with a strong password."
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group relative">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="password-criteria">
          <div className="criteria-column">
            {renderRequirement('1 uppercase', criteria.uppercase)}
            {renderRequirement('1 number', criteria.number)}
          </div>
          <div className="criteria-column">
            {renderRequirement('1 lowercase', criteria.lowercase)}
            {renderRequirement('At least 8 characters long', criteria.length)}
          </div>
          <div className="criteria-column">
            {renderRequirement('1 special character', criteria.special)}
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
          >
            Next: Organisation Information
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
