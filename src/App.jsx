import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Import refactored signup feature components
import EmailStep from './features/signup/EmailStep';
import VerifyEmailStep from './features/signup/VerifyEmailStep';
import PasswordStep from './features/signup/PasswordStep';
import OrganisationStep from './features/signup/OrganisationStep';
import AdminStep from './features/signup/AdminStep';

// Import Dashboard feature components
import DashboardLayout from './features/dashboard/DashboardLayout';
import DriversEmptyState from './features/dashboard/Drivers';
import BusStops from './features/dashboard/BusStops';
import LiveTrips from './features/dashboard/LiveTrips';
import TripHistory from './features/dashboard/TripHistory';
import RoutesView from './features/dashboard/Routes';

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Organization Info State
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');

  // Admin Info State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleAdminSubmit = () => {
    console.log("Account creation complete!", {
      email, password, orgName, orgType, website, location, firstName, lastName, jobTitle
    });
    navigate('/dashboard');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Signup Routes */}
        <Route path="/signup" element={
          <EmailStep 
            email={email} 
            setEmail={setEmail} 
            onNext={() => navigate('/signup/verify')} 
          />
        } />
        <Route path="/signup/verify" element={
          <VerifyEmailStep 
            email={email} 
            onNext={() => navigate('/signup/password')} 
          />
        } />
        <Route path="/signup/password" element={
          <PasswordStep 
            password={password} 
            setPassword={setPassword} 
            onNext={() => navigate('/signup/organization')} 
          />
        } />
        <Route path="/signup/organization" element={
          <OrganisationStep 
            orgName={orgName} setOrgName={setOrgName}
            orgType={orgType} setOrgType={setOrgType}
            website={website} setWebsite={setWebsite}
            location={location} setLocation={setLocation}
            onNext={() => navigate('/signup/admin')} 
          />
        } />
        <Route path="/signup/admin" element={
          <AdminStep 
            email={email}
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            jobTitle={jobTitle} setJobTitle={setJobTitle}
            onSubmit={handleAdminSubmit} 
          />
        } />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="drivers" replace />} />
          <Route path="drivers" element={<DriversEmptyState firstName={firstName} />} />
          <Route path="bus-stops" element={<BusStops />} />
          <Route path="routes" element={<RoutesView />} />
          <Route path="live-trips" element={<LiveTrips />} />
          <Route path="trip-history" element={<TripHistory />} />

          {/* Legacy redirects */}
          <Route path="bus_stops" element={<Navigate to="bus-stops" replace />} />
          <Route path="live_trips" element={<Navigate to="live-trips" replace />} />
          <Route path="trip_history" element={<Navigate to="trip-history" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
