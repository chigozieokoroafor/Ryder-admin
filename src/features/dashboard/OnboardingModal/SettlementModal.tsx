import { useState, type ChangeEvent } from 'react';

export interface SettlementModalProps {
  onSave: () => void;
}

export default function SettlementModal({ onSave }: SettlementModalProps) {
  const [frequency, setFrequency] = useState<string>('Weekly');
  const [payoutDay, setPayoutDay] = useState<string>('Monday');
  const [driverPercentage, setDriverPercentage] = useState<number | ''>(60);

  const numericDriverPct = driverPercentage === '' ? 0 : driverPercentage;
  const orgPercentage = 100 - numericDriverPct;

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 0;
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    setDriverPercentage(val);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setDriverPercentage('');
      return;
    }
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    setDriverPercentage(val);
  };

  const handleInputBlur = () => {
    if (driverPercentage === '') setDriverPercentage(0);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Settlement configuration</h2>
          <p className="modal-subtitle">Configure how and when earnings are paid.</p>
        </div>

        <div className="modal-divider"></div>

        <div className="modal-content">
          <div className="config-section">
            <h3 className="section-title">Settlement Cycle</h3>
            <div className="form-row">
              <div className="input-group">
                <label className="section-label">Settlement Frequency</label>
                <div className="select-wrapper">
                  <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="modal-select">
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label className="section-label">Payout Day</label>
                <div className="select-wrapper">
                  <select value={payoutDay} onChange={(e) => setPayoutDay(e.target.value)} className="modal-select">
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-divider"></div>

          <div className="config-section">
            <h3 className="section-title">Settlement Percentage Split</h3>

            <div className="split-header">
              <p className="split-desc">
                Drag the slider or type the driver's percentage. The organization's share adjusts automatically.
              </p>
              <div className="percentage-input-wrapper">
                <input
                  type="number"
                  value={driverPercentage}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className="percentage-input"
                />
                <span className="percentage-symbol">%</span>
              </div>
            </div>

            <div className="slider-container">
              <input
                type="range"
                min={0}
                max={100}
                value={numericDriverPct}
                onChange={handleSliderChange}
                className="percentage-slider"
                style={{
                  background: `linear-gradient(to right, #1f4b7a ${numericDriverPct}%, #e5e7eb ${numericDriverPct}%)`,
                }}
              />
              <span className="slider-ratio">
                {numericDriverPct}% / {orgPercentage}%
              </span>
            </div>

            <div className="split-footer">
              <div className="split-item">
                <span className="split-label">Driver receives</span>
                <span className="split-value">{numericDriverPct}%</span>
              </div>
              <div className="split-item text-right">
                <span className="split-label">Organisation receives</span>
                <span className="split-value">{orgPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ marginTop: '1rem' }}>
          <button className="btn-primary" onClick={onSave}>
            Save configuration
          </button>
        </div>
      </div>
    </div>
  );
}

