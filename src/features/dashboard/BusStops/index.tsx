import { useState, type MouseEvent } from 'react';

export interface BusStop {
  id: number;
  name: string;
  address: string;
  lat: string;
  lng: string;
  x: string;
  y: string;
}

interface StopCoords {
  x: string;
  y: string;
  lat: string;
  lng: string;
}

export default function BusStops() {
  const initialStops: BusStop[] = [
    {
      id: 1,
      name: 'SUB Bus Stop',
      address: 'Students Union Building Bus Stop, Ife 220103, Osun, Nigeria',
      lat: '3.71022°N',
      lng: '14.01889°W',
      x: '60%',
      y: '50%',
    },
    {
      id: 2,
      name: 'Bus Stop 2',
      address: 'Bus Stop 2, Adesoji Aderemi Rd, Ife 220103, Osun, Nigeria',
      lat: '3.71482°N',
      lng: '14.77190°W',
      x: '80%',
      y: '65%',
    },
    {
      id: 3,
      name: 'Awolowo Hall Bus Stop',
      address: 'Awolowo Hall Bus Stop, Aluta-Faj Annex Road, Ife 220103, Osun, Nigeria',
      lat: '3.29271°N',
      lng: '15.66710°W',
      x: '30%',
      y: '70%',
    },
  ];

  const [busStops, setBusStops] = useState<BusStop[]>(initialStops);
  const [activeStop, setActiveStop] = useState<number | null>(initialStops[0].id);

  // Add stop state
  const [isAddingStop, setIsAddingStop] = useState<boolean>(false);
  const [newStopName, setNewStopName] = useState<string>('');
  const [newStopLocation, setNewStopLocation] = useState<string>('');
  const [newStopCoords, setNewStopCoords] = useState<StopCoords | null>(null);

  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAddingStop) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Mock lat/lng for display
    const mockLat = (3.7 + Math.random() * 0.1).toFixed(5) + '°N';
    const mockLng = (14.0 + Math.random() * 0.1).toFixed(5) + '°W';

    setNewStopCoords({ x: `${x}%`, y: `${y}%`, lat: mockLat, lng: mockLng });
    setNewStopLocation(`Selected Location (${mockLat}, ${mockLng})`);
  };

  const handleSaveStop = () => {
    const newStop: BusStop = {
      id: Date.now(),
      name: newStopName || 'New Bus Stop',
      address: newStopLocation || 'Unknown Location',
      lat: newStopCoords ? newStopCoords.lat : '0.00000°N',
      lng: newStopCoords ? newStopCoords.lng : '0.00000°W',
      x: newStopCoords ? newStopCoords.x : '50%',
      y: newStopCoords ? newStopCoords.y : '50%',
    };

    setBusStops([newStop, ...busStops]);
    setIsAddingStop(false);
    setNewStopName('');
    setNewStopLocation('');
    setNewStopCoords(null);
    setActiveStop(newStop.id);
  };

  const startAddingStop = () => {
    setIsAddingStop(true);
    setNewStopName('');
    setNewStopLocation('');
    setNewStopCoords(null);
    setActiveStop(null);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div className="bus-stops-layout">
        <div className="bus-stops-sidebar">
          <div className="dashboard-header" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 className="dashboard-title" style={{ margin: 0 }}>
                Bus Stops
              </h1>
              {busStops.length > 0 && (
                <span className="count-badge">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '12px', height: '12px', marginRight: '4px' }}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {busStops.length}
                </span>
              )}
            </div>
            {busStops.length > 0 ? (
              <button
                className="btn-primary"
                onClick={startAddingStop}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: '0.35rem', width: '14px', height: '14px' }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New stop
              </button>
            ) : (
              <button className="btn-outline" onClick={startAddingStop} style={{ color: '#111827' }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#4b5563' }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New stop
              </button>
            )}
          </div>

          {busStops.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '48px', height: '48px' }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h2 className="empty-title">Add a bus stop</h2>
              <p className="empty-subtitle">Define all pickup and drop off points</p>
              <button
                className="btn-primary"
                onClick={startAddingStop}
                style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: '0.35rem', width: '16px', height: '16px' }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New stop
              </button>
            </div>
          ) : (
            <div className="bus-stops-list">
              {busStops.map((stop) => (
                <div
                  key={stop.id}
                  className={`bus-stop-card ${activeStop === stop.id ? 'active' : ''}`}
                  onClick={() => !isAddingStop && setActiveStop(stop.id)}
                >
                  <div className="bus-stop-card-header">
                    <h3 className="bus-stop-name">{stop.name}</h3>
                    <div className="bus-stop-actions">
                      <button
                        className="icon-btn blue"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </button>
                      <button
                        className="icon-btn red"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBusStops(busStops.filter((s) => s.id !== stop.id));
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="bus-stop-address">{stop.address}</p>
                  <div className="bus-stop-coords">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: '12px', height: '12px' }}
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {stop.lat}, {stop.lng}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bus-stops-map" onClick={handleMapClick} style={{ cursor: isAddingStop ? 'crosshair' : 'default' }}>
          {/* Render existing stops */}
          {busStops.map((stop) => (
            <div
              key={`marker-${stop.id}`}
              className={`map-marker ${activeStop === stop.id ? 'active' : ''}`}
              style={{ left: stop.x, top: stop.y }}
              onClick={(e) => {
                if (!isAddingStop) {
                  e.stopPropagation();
                  setActiveStop(stop.id);
                }
              }}
            >
              <div className="marker-dot"></div>
              {activeStop === stop.id && (
                <div className="marker-tooltip">
                  <div className="marker-tooltip-title">{stop.name}</div>
                  <div className="marker-tooltip-coords">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {stop.lat}, {stop.lng}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Render new stop marker being added */}
          {isAddingStop && newStopCoords && (
            <div className="map-marker active" style={{ left: newStopCoords.x, top: newStopCoords.y, pointerEvents: 'none', zIndex: 11 }}>
              <div className="marker-dot"></div>
            </div>
          )}

          {/* New Stop Floating Panel */}
          {isAddingStop && (
            <div className="new-stop-panel" onClick={(e) => e.stopPropagation()}>
              <div className="new-stop-header">
                <h3>New stop</h3>
                <button className="icon-btn" onClick={() => setIsAddingStop(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="new-stop-body">
                <div className="input-group">
                  <label className="section-label" style={{ fontSize: '0.85rem' }}>
                    Stop Name
                  </label>
                  <input
                    type="text"
                    className="modal-select"
                    placeholder="Name of bus stop"
                    value={newStopName}
                    onChange={(e) => setNewStopName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="section-label" style={{ fontSize: '0.85rem' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    className="modal-select"
                    placeholder="Search location (or click map)"
                    value={newStopLocation}
                    onChange={(e) => setNewStopLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="new-stop-footer">
                <button className="btn-outline" onClick={() => setIsAddingStop(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSaveStop}>
                  Save new stop
                </button>
              </div>
            </div>
          )}

          <div className="map-controls">
            <button className="map-control-btn">+</button>
            <button className="map-control-btn">-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

