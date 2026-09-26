import React from 'react';
import AuthLayout from '../../../components/AuthLayout';

export default function EmailStep({ email, setEmail, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">Next: Verify email</button>
        </div>
      </form>
    </AuthLayout>
  );
}
