import { useState } from 'react';

export interface HistoryTrip {
  id: string;
  date: string;
  driver: string;
  duration: string;
  totalStops: string;
  passengers: string;
  revenue: string;
}

export default function TripHistory() {
  const [historyTrips] = useState<HistoryTrip[]>([
    { id: '#1201', date: 'June 03', driver: 'Famy Goliath', duration: '6m', totalStops: '2', passengers: '4', revenue: '₦950' },
    { id: '#1202', date: 'June 02', driver: 'Doflamingo Okoroafor', duration: '36m', totalStops: '6', passengers: '7', revenue: '₦4,000' },
    { id: '#1203', date: 'June 02', driver: 'Astapor Gideon', duration: '37m', totalStops: '7', passengers: '10', revenue: '₦7,500' },
    { id: '#1204', date: 'June 02', driver: 'Mila Hartmann', duration: '38m', totalStops: '5', passengers: '8', revenue: '₦5,200' },
    { id: '#1205', date: 'June 02', driver: 'Ravi Chandrasekar', duration: '39m', totalStops: '8', passengers: '12', revenue: '₦9,100' },
    { id: '#1206', date: 'June 02', driver: 'Sofia Alvarez', duration: '40m', totalStops: '6', passengers: '9', revenue: '₦6,300' },
    { id: '#1207', date: 'June 02', driver: 'Kenji Takahashi', duration: '41m', totalStops: '7', passengers: '11', revenue: '₦8,000' },
    { id: '#1208', date: 'June 02', driver: 'Amina Yusuf', duration: '42m', totalStops: '4', passengers: '5', revenue: '₦3,700' },
    { id: '#1209', date: 'June 02', driver: "Liam O'Connor", duration: '43m', totalStops: '9', passengers: '13', revenue: '₦10,500' },
    { id: '#1210', date: 'June 02', driver: 'Zara Petrova', duration: '44m', totalStops: '6', passengers: '7', revenue: '₦5,800' },
  ]);

  const totalTrips = historyTrips.length === 0 ? 0 : 50;
  const totalRevenue = historyTrips.length === 0 ? '₦0' : '₦748,000';

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: 'white' }}>
        {/* Header */}
        <div className="dashboard-header" style={{ justifyContent: 'space-between', borderBottom: 'none', paddingBottom: '0.5rem' }}>
          <h1 className="dashboard-title" style={{ margin: 0 }}>
            Trip History
          </h1>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span style={{ color: '#111827', fontWeight: 500 }}>All Time</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards-row">
          <div className="stat-card">
            <div className="stat-card-header">
              <span>Total Trips</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div className="stat-card-value">{totalTrips}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <span>Total Revenue Generated</span>
              <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>₦</span>
            </div>
            <div className="stat-card-value">{totalRevenue}</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="input-group" style={{ margin: 0, width: '300px' }}>
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

          <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#4b5563', fontSize: '0.85rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
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
          </button>
        </div>

        {/* Content */}
        {historyTrips.length === 0 ? (
          <div className="empty-state" style={{ flex: 1 }}>
            <div className="empty-icon-wrapper" style={{ border: 'none', background: 'transparent', marginBottom: '0.5rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '64px', height: '64px' }}>
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>
            <h2 className="empty-title">Your trip history will appear here</h2>
            <p className="empty-subtitle" style={{ maxWidth: '400px' }}>
              Once your drivers complete their first trips, you'll see a full record of the trip details and revenue here.
            </p>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table className="trips-table">
              <thead>
                <tr>
                  <th style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Trip ID{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '12px', height: '12px' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </th>
                  <th>Date</th>
                  <th>Driver</th>
                  <th>Duration</th>
                  <th>Total Stops</th>
                  <th>Passengers</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {historyTrips.map((trip) => (
                  <tr key={trip.id} className="trip-row-hover">
                    <td style={{ color: '#6b7280' }}>{trip.id}</td>
                    <td>{trip.date}</td>
                    <td style={{ fontWeight: 500 }}>{trip.driver}</td>
                    <td>{trip.duration}</td>
                    <td>{trip.totalStops}</td>
                    <td>{trip.passengers}</td>
                    <td style={{ fontWeight: 500 }}>{trip.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-pagination">
              <span>Showing 1-10 of 50</span>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', cursor: 'not-allowed' }}>
                  <polyline points="11 17 6 12 11 7"></polyline>
                  <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', cursor: 'not-allowed' }}>
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', cursor: 'pointer' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', cursor: 'pointer' }}>
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

