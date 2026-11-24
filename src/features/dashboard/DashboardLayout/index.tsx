import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../Dashboard.css';

export interface DashboardLayoutProps {
  liveTripsCount?: number;
}

type ActiveNav = 'drivers' | 'bus_stops' | 'live_trips' | 'trip_history' | 'routes';

export default function DashboardLayout({ liveTripsCount = 3 }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTripsOpen, setIsTripsOpen] = useState<boolean>(true);
  const path = location.pathname;

  let activeNav: ActiveNav = 'drivers';
  if (path.includes('bus-stops')) activeNav = 'bus_stops';
  if (path.includes('live-trips')) activeNav = 'live_trips';
  if (path.includes('trip-history')) activeNav = 'trip_history';
  if (path.includes('routes')) activeNav = 'routes';

  const handleNavigate = (view: string) => {
    navigate(`/dashboard/${view}`);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            riyder
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <svg className="icon-bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Operations</div>

          <div
            className={`nav-item ${activeNav === 'drivers' ? 'active' : ''}`}
            onClick={() => handleNavigate('drivers')}
            style={{ cursor: 'pointer' }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
              <path d="M10.5 13.5l-3 7.5"></path>
              <path d="M13.5 13.5l3 7.5"></path>
              <path d="M2.5 13c4-4 15-4 19 0"></path>
            </svg>
            Drivers
          </div>

          <div
            className="nav-item"
            onClick={() => setIsTripsOpen(!isTripsOpen)}
            style={{ cursor: 'pointer', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 7h7a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h9"></path>
                <circle cx="5" cy="7" r="1.5" strokeWidth="2"></circle>
                <circle cx="18" cy="19" r="1.5" strokeWidth="2"></circle>
              </svg>
              Trips
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: '16px',
                height: '16px',
                transition: 'transform 0.2s',
                transform: isTripsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {isTripsOpen && (
            <div className="nav-sub-items">
              <div
                className={`nav-sub-item ${activeNav === 'live_trips' ? 'active' : ''}`}
                onClick={() => handleNavigate('live-trips')}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                Live Trips
                <span className="count-badge" style={{ backgroundColor: activeNav === 'live_trips' ? '#f3f4f6' : '#e5e7eb' }}>
                  {liveTripsCount}
                </span>
              </div>
              <div
                className={`nav-sub-item ${activeNav === 'trip_history' ? 'active' : ''}`}
                onClick={() => handleNavigate('trip-history')}
                style={{ cursor: 'pointer' }}
              >
                Trip History
              </div>
              <div
                className={`nav-sub-item ${activeNav === 'bus_stops' ? 'active' : ''}`}
                onClick={() => handleNavigate('bus-stops')}
                style={{ cursor: 'pointer' }}
              >
                Bus Stops
              </div>
              <div
                className={`nav-sub-item ${activeNav === 'routes' ? 'active' : ''}`}
                onClick={() => handleNavigate('routes')}
                style={{ cursor: 'pointer' }}
              >
                Routes
              </div>
            </div>
          )}
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Finance & Reporting</div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            Settlements
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Audit Log
          </div>
        </div>

        <div className="setup-card">
          <svg className="setup-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
          <div className="setup-title">Complete setup</div>
          <div className="setup-text">Finish setting up your RIYDER organisation account and go live.</div>
          <button className="btn-setup">Finish setup</button>
        </div>

        <div className="sidebar-settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Settings
        </div>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

