import React from 'react';
import AuthLayout from '../../../components/AuthLayout';

export default function AdminStep({
  email,
  firstName, setFirstName,
  lastName, setLastName,
  jobTitle, setJobTitle,
  onSubmit
}) {
  const isAdminValid = firstName.trim() !== '' && lastName.trim() !== '' && jobTitle.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
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
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last name</label>
            <input 
              type="text" 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="adminEmail">Email address</label>
          <input 
            type="email" 
            id="adminEmail" 
            value={email || 'talos@unilag.com'}
            disabled
          />
        </div>

        <div className="input-group">
          <label htmlFor="jobTitle">Job title</label>
          <input 
            type="text" 
            id="jobTitle" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        
        <div className="divider"></div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
          >
            Create account
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
