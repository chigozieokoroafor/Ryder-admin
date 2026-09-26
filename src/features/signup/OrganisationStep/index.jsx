import React from 'react';
import AuthLayout from '../../../components/AuthLayout';

export default function OrganisationStep({ 
  orgName, setOrgName, 
  orgType, setOrgType, 
  website, setWebsite, 
  location, setLocation, 
  onNext 
}) {
  const isOrgValid = orgName.trim() !== '' && orgType !== '' && location.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <AuthLayout 
      title="Organisation Information"
      subtitle="This is how Riyder will identify your organisation."
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="orgName">Organisation name</label>
          <input 
            type="text" 
            id="orgName" 
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="orgType">Organisation type</label>
          <select 
            id="orgType" 
            value={orgType}
            onChange={(e) => setOrgType(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="company">Company</option>
            <option value="nonprofit">Non-Profit</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input-group" style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="website">Website <span className="label-optional">(optional)</span></label>
          <input 
            type="text" 
            id="website" 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <p className="input-helper-text" style={{ marginBottom: '1.5rem' }}>This helps verify your organisation.</p>

        <div className="input-group">
          <label htmlFor="location">Where are you located?</label>
          <input 
            type="text" 
            id="location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
          >
            Next: Admin Information
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
