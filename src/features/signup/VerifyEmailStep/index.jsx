import React from 'react';
import AuthLayout from '../../../components/AuthLayout';

export default function VerifyEmailStep({ email, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <AuthLayout 
      title="Verify your email"
      subtitle={<>We've sent a verification code to <strong>{email || 'talos@unilag.com'}</strong>. Enter it below.</>}
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Secure code</label>
          <div className="code-inputs">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input 
                key={i}
                id={`code-${i}`}
                type="text" 
                maxLength="1"
                className="code-input"
                placeholder="0" 
                onChange={(e) => handleCodeChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>
        </div>

        <p className="helper-text">
          Has your code expired? Don't see the email? Check your spam or <a href="#" className="link">request a new verification code.</a>
        </p>
        
        <div className="divider"></div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Confirm</button>
        </div>
      </form>
    </AuthLayout>
  );
}
