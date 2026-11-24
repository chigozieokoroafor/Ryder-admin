import { useState } from 'react';

export interface LiveTrip {
  id: string;
  driver: string;
  departed: string;
  duration: string;
  totalStops: string;
  passengers: string;
  revenue: string;
}

export default function LiveTrips() {
  const [liveTrips] = useState<LiveTrip[]>([
    { id: '#1201', driver: 'Famy Goliath', departed: '10:27 AM', duration: '6m', totalStops: '2', passengers: '4', revenue: '₦950' },
    { id: '#1202', driver: 'Doflamingo Okoroafor', departed: '09:57 AM', duration: '36m', totalStops: '6', passengers: '7', revenue: '₦4,000' },
    { id: '#1203', driver: 'Astapor Gideon', departed: '09:56 AM', duration: '37m', totalStops: '7', passengers: '10', revenue: '₦7,500' },
  ]);

  const [selectedTrip, setSelectedTrip] = useState<LiveTrip | null>(null);

  const getFormattedDate = (): string => {
    const date = new Date();
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dom = date.getDate();
    const isTeen = dom % 100 - (dom % 10) === 10;
    const suffix = ['th', 'st', 'nd', 'rd'][isTeen || dom % 10 > 3 ? 0 : dom % 10];
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).replace(' ', '');
    return `${day}, ${dom}${suffix} ${month}, ${year} • ${time}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: 'white', position: 'relative' }}>
      {/* Header */}
      <div className="dashboard-header" style={{ justifyContent: 'space-between', borderBottom: 'none', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h1 className="dashboard-title" style={{ margin: 0 }}>
            Live Trips
          </h1>
          {liveTrips.length > 0 && (
            <span className="count-badge" style={{ marginTop: '2px' }}>
              {liveTrips.length}
            </span>
          )}
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{getFormattedDate()}</div>
      </div>

      {/* Search */}
      <div style={{ padding: '0 2rem 1rem 2rem', borderBottom: '1px solid #f3f4f6' }}>
        <div className="input-group" style={{ margin: 0 }}>
          <div style={{ position: 'relative' }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px' }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="modal-select"
              style={{ paddingLeft: '36px', border: 'none', fontSize: '0.95rem' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {liveTrips.length === 0 ? (
        <div className="empty-state" style={{ flex: 1 }}>
          <div className="empty-icon-wrapper" style={{ border: 'none', background: 'transparent', marginBottom: '0.5rem' }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '64px', height: '64px' }}
            >
              <path d="M12 20v-2"></path>
              <path d="M9 14a3 3 0 0 1 6 0"></path>
              <path d="M6 11a7 7 0 0 1 12 0"></path>
              <path d="M3 8a11 11 0 0 1 18 0"></path>
            </svg>
          </div>
          <h2 className="empty-title">No live trips</h2>
          <p className="empty-subtitle">Live trips will appear here as drivers start their route.</p>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table className="trips-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Driver</th>
                <th>Departed</th>
                <th>Duration</th>
                <th>Total Stops</th>
                <th>Passengers</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {liveTrips.map((trip) => (
                <tr
                  key={trip.id}
                  onClick={() => setSelectedTrip(trip)}
                  style={{ cursor: 'pointer', backgroundColor: selectedTrip?.id === trip.id ? '#f9fafb' : 'transparent' }}
                  className="trip-row-hover"
                >
                  <td style={{ color: '#6b7280' }}>{trip.id}</td>
                  <td style={{ fontWeight: 500 }}>{trip.driver}</td>
                  <td>{trip.departed}</td>
                  <td className="text-blue">{trip.duration}</td>
                  <td className="text-blue">{trip.totalStops}</td>
                  <td className="text-blue">{trip.passengers}</td>
                  <td className="text-blue">{trip.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Side Panel Overlay */}
      {selectedTrip && (
        <div className="side-panel-overlay" onClick={() => setSelectedTrip(null)}>
          <div className="side-panel" onClick={(e) => e.stopPropagation()}>
            <div className="side-panel-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>
                    Trip {selectedTrip.id.replace('#', '#T')}
                  </h2>
                  <span className="live-badge">
                    <span className="live-dot"></span> Live
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>{selectedTrip.driver}</p>
              </div>
              <button className="icon-btn" onClick={() => setSelectedTrip(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="side-panel-content">
              <div className="trip-timeline">
                <div className="timeline-start-node">
                  <div className="node-circle blue-hollow"></div>
                  <span className="node-time">09:57am</span>
                </div>

                <div className="timeline-items">
                  <div className="timeline-line"></div>

                  <div className="timeline-item">
                    <div className="timeline-icon-wrap">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '12px', height: '12px' }}
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="timeline-details">
                      <div className="timeline-title">
                        SUB Bus Stop <span className="timeline-time">(09:57am)</span>
                      </div>
                      <div className="timeline-stats">
                        <span className="stat-green">↑ 13 passengers boarded</span>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon-wrap">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '12px', height: '12px' }}
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="timeline-details">
                      <div className="timeline-title">
                        Fajuyi Hall Bus Stop <span className="timeline-time">(10:13am)</span>
                      </div>
                      <div className="timeline-stats">
                        <span className="stat-green">↑ 4 passengers boarded</span>
                        <span className="stat-red">↓ 7 passenger exited</span>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon-wrap bg-white">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '14px', height: '14px' }}
                      >
                        <rect x="3" y="4" width="18" height="14" rx="2"></rect>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                        <circle cx="7" cy="15" r="1"></circle>
                        <circle cx="17" cy="15" r="1"></circle>
                      </svg>
                    </div>
                    <div className="timeline-details">
                      <div className="timeline-title font-semibold text-black">
                        Moremi Hall Bus Stop <span className="timeline-time text-black">(10:25am)</span>
                      </div>
                      <div className="timeline-stats">
                        <span className="stat-red">↓ 3 passenger exited</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="revenue-card">
                <div className="revenue-header">
                  <span className="revenue-label">Revenue Generated</span>
                  <span className="currency-symbol">₦</span>
                </div>
                <div className="revenue-total">+{selectedTrip.revenue}</div>

                <div className="revenue-divider"></div>

                <div className="revenue-breakdown-title">Revenue Breakdown</div>

                <div className="revenue-row">
                  <span>Total fare paid</span>
                  <span className="font-medium text-black">₦4,200</span>
                </div>

                <div className="revenue-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', position: 'relative' }} className="service-fee-label">
                    RIYDER service fee
                    <div className="tooltip-container">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '12px', height: '12px', cursor: 'pointer' }}
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      <div className="fee-tooltip">
                        All fares are subject to a RIYDER service fee of 5%, deducted at the point of collection.
                      </div>
                    </div>
                  </span>
                  <span className="font-medium text-black">- ₦200</span>
                </div>

                <div className="revenue-divider-thick"></div>

                <div className="revenue-row net-revenue">
                  <span>Net revenue</span>
                  <span>{selectedTrip.revenue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

