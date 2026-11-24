import { useState } from 'react';

export interface RouteItem {
  id: string;
  departure: string;
  arrival: string;
  distance: string;
  fare: string;
}

export default function RoutesView() {
  const [routes] = useState<RouteItem[]>([
    { id: '#1201', departure: 'SUB Bus Stop', arrival: 'Awolowo Hall Bus Stop', distance: '1.1 km', fare: '₦ 200' },
    { id: '#1202', departure: 'Awolowo Hall Bus Stop', arrival: 'Bus Stop 2', distance: '1.4 km', fare: '₦ 250' },
    { id: '#1203', departure: 'Bus Stop 2', arrival: 'SUB Bus Stop', distance: '0.3 km', fare: '₦ 100' },
  ]);

  const [isAddingRoute, setIsAddingRoute] = useState<boolean>(false);

  if (isAddingRoute) {
    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', position: 'relative' }}>
        {/* Left Side Panel */}
        <div
          style={{
            width: '400px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10,
            borderRight: '1px solid #e5e7eb',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#111827' }}>New route</h2>
            <button onClick={() => setIsAddingRoute(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div style={{ padding: '1.5rem', flex: 1 }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500, marginBottom: '0.25rem' }}>Step 1 of 2</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 2rem 0', color: '#111827' }}>Select Stops</h3>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#111827', marginBottom: '0.5rem' }}>Departure stop</label>
              <div style={{ position: 'relative' }}>
                <select
                  className="form-input"
                  style={{
                    appearance: 'none',
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    backgroundColor: 'white',
                  }}
                >
                  <option>Select departure stop</option>
                  <option>SUB Bus Stop</option>
                  <option>Awolowo Hall Bus Stop</option>
                  <option>Bus Stop 2</option>
                </select>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', pointerEvents: 'none' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#111827', marginBottom: '0.5rem' }}>Arrival stop</label>
              <div style={{ position: 'relative' }}>
                <select
                  className="form-input"
                  style={{
                    appearance: 'none',
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    backgroundColor: 'white',
                  }}
                >
                  <option>Select arrival stop</option>
                  <option>SUB Bus Stop</option>
                  <option>Awolowo Hall Bus Stop</option>
                  <option>Bus Stop 2</option>
                </select>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', pointerEvents: 'none' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <button
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#3b82f6',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: 0,
                cursor: 'pointer',
                marginBottom: '2rem',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add a new bus stop
            </button>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-outline" onClick={() => setIsAddingRoute(false)}>
                Cancel
              </button>
              <button className="btn-primary" style={{ backgroundColor: '#93c5fd', borderColor: '#93c5fd', cursor: 'not-allowed' }}>
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#e5e5f7',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")',
            backgroundSize: '400px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.5,
              backgroundImage:
                'linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6), linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
            }}
          ></div>

          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <button style={{ width: '30px', height: '30px', border: 'none', background: 'none', borderBottom: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button style={{ width: '30px', height: '30px', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      {/* Header */}
      <div className="dashboard-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h1 className="dashboard-title" style={{ margin: 0 }}>
            Routes
          </h1>
          <span className="count-badge" style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>
            {routes.length}
          </span>
        </div>
        <button className="btn-primary" onClick={() => setIsAddingRoute(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New route
        </button>
      </div>

      {/* Search Toolbar */}
      <div style={{ padding: '1rem 2rem', borderBottom: '1px solid #f3f4f6' }}>
        <div className="input-group" style={{ margin: 0, maxWidth: '400px' }}>
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
            <input type="text" placeholder="Search" className="modal-select" style={{ paddingLeft: '36px', border: 'none', fontSize: '0.95rem' }} />
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table className="trips-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
              </th>
              <th style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Route ID{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '12px', height: '12px' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </th>
              <th>Departure Stop</th>
              <th style={{ width: '40px' }}></th>
              <th>Arrival Stop</th>
              <th>Distance</th>
              <th>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ fontWeight: 'normal' }}>₦</span> Fare
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="trip-row-hover">
                <td>
                  <input type="checkbox" style={{ cursor: 'pointer' }} />
                </td>
                <td style={{ color: '#6b7280' }}>{route.id}</td>
                <td style={{ fontWeight: 500, color: '#111827' }}>{route.departure}</td>
                <td>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </td>
                <td style={{ fontWeight: 500, color: '#111827' }}>{route.arrival}</td>
                <td>{route.distance}</td>
                <td style={{ fontWeight: 500, color: '#111827' }}>{route.fare}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

