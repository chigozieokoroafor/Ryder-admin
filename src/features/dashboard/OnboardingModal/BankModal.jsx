import React, { useState } from 'react';

export default function BankModal({ onSave }) {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const isValid = bank !== '' && accountNumber.length === 10 && accountName.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Organisation bank account</h2>
          <p className="modal-subtitle">Where your organisation's retained earnings will be paid</p>
        </div>
        
        <div className="modal-divider"></div>

        <form onSubmit={handleSubmit}>
          <div className="modal-content" style={{ gap: '1.25rem' }}>
            <div className="input-group">
              <label className="section-label">Bank name</label>
              <div className="select-wrapper">
                <select 
                  value={bank} 
                  onChange={(e) => setBank(e.target.value)} 
                  className="modal-select"
                  style={{ color: bank ? '#111827' : '#9ca3af' }}
                >
                  <option value="" disabled hidden>Select bank</option>
                  <option value="GTBank" style={{ color: '#111827' }}>Guaranty Trust Bank</option>
                  <option value="Zenith" style={{ color: '#111827' }}>Zenith Bank</option>
                  <option value="FirstBank" style={{ color: '#111827' }}>First Bank of Nigeria</option>
                  <option value="Access" style={{ color: '#111827' }}>Access Bank</option>
                  <option value="UBA" style={{ color: '#111827' }}>United Bank for Africa</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="section-label">Account number (NUBAN)</label>
              <input 
                type="text" 
                maxLength="10"
                placeholder="10 digits" 
                className="modal-select" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="input-group">
              <label className="section-label">Account name</label>
              <input 
                type="text" 
                className="modal-select" 
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: '1rem' }}>
            <button 
              type="submit" 
              className="btn-primary"
            >
              Save bank account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
