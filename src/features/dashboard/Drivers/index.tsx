import { useOutletContext } from 'react-router-dom';
import type { DashboardOutletContext } from '../DashboardLayout/util';

export default function DriversEmptyState() {
  const context = useOutletContext<DashboardOutletContext | undefined>();
  const canAddDrivers = Boolean(
    context?.checks?.busStops && context?.checks?.routesPricing
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Drivers</h1>
        <button
          className={canAddDrivers ? 'btn-primary' : 'btn-outline'}
          disabled={!canAddDrivers}
          style={canAddDrivers ? { display: 'flex', alignItems: 'center', gap: '0.35rem' } : undefined}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={canAddDrivers ? { width: '16px', height: '16px' } : undefined}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add driver
        </button>
      </div>

      <div className="dashboard-toolbar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search" />
        </div>
        <div className="filter-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filter
        </div>
      </div>

      <div className="empty-state">
        <div className="empty-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>

        <h2 className="empty-title">Add your first driver</h2>
        <p className="empty-subtitle">Drivers operate your routes. Add a driver to start tracking performance.</p>

        <div className="btn-wrapper">
          <button
            className={canAddDrivers ? 'btn-primary' : 'btn-disabled-solid'}
            disabled={!canAddDrivers}
            style={canAddDrivers ? { display: 'flex', alignItems: 'center', gap: '0.35rem' } : undefined}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={canAddDrivers ? { width: '16px', height: '16px' } : undefined}
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add driver
          </button>

          {!canAddDrivers && (
            <div className="tooltip">You cannot add drivers until stops and routes exist</div>
          )}
        </div>
      </div>
    </div>
  );
}
