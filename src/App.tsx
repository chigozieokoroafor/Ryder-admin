import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import {
  getStoredEmail,
  getStoredName,
  getStoredToken,
  setStoredEmail,
  setStoredName,
  setStoredToken,
  setUnauthorizedHandler,
} from './utils/api';

// Import refactored signup & auth feature components
import EmailStep from './features/signup/EmailStep';
import type { CheckAuthData } from './features/signup/EmailStep/util';
import LoginPasswordStep from './features/signup/LoginPasswordStep';
import CreateAccountStep from './features/signup/CreateAccountStep';
import type { AuthSessionData } from './features/signup/CreateAccountStep/util';
import VerifyEmailStep from './features/signup/VerifyEmailStep';
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

  const [email, setEmail] = useState<string>(() => getStoredEmail());
  const [password, setPassword] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>(() => getStoredToken());
  const [existingAccountName, setExistingAccountName] = useState<string>(() => getStoredName());

  // Organization Info State
  const [orgName, setOrgName] = useState<string>('');
  const [orgType, setOrgType] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  // Admin Info State
  const [firstName, setFirstName] = useState<string>(() => getStoredName());
  const [lastName, setLastName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setAuthToken('');
      setPassword('');
      navigate('/login', { replace: true });
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [navigate]);

  const handleTokenUpdate = (newToken: string) => {
    setAuthToken(newToken);
    setStoredToken(newToken);
  };

  const handleEmailCheckComplete = ({ accountExist, name }: CheckAuthData) => {
    setStoredEmail(email.trim());
    setPassword('');
    if (accountExist) {
      const resolvedName = name || '';
      setExistingAccountName(resolvedName);
      setStoredName(resolvedName);
      if (resolvedName && !firstName) {
        setFirstName(resolvedName);
      }
      navigate('/login/password');
    } else {
      setExistingAccountName('');
      setStoredName('');
      navigate('/signup/create-account');
    }
  };

  const handleCreateAccountSuccess = (session: AuthSessionData) => {
    if (session?.email) {
      setEmail(session.email);
      setStoredEmail(session.email);
    }
    if (session?.token) {
      handleTokenUpdate(session.token);
    }
    setPassword('');
    navigate('/signup/verify');
  };

  const handleOtpVerified = (session: AuthSessionData) => {
    if (session?.token) {
      handleTokenUpdate(session.token);
    }
    if (session?.email) {
      setEmail(session.email);
      setStoredEmail(session.email);
    }
    if (session?.isProfileUploaded) {
      navigate('/dashboard');
    } else {
      navigate('/signup/organization');
    }
  };

  const handleLoginSuccess = (session: AuthSessionData) => {
    if (session?.token) {
      handleTokenUpdate(session.token);
    }
    if (session?.email) {
      setEmail(session.email);
      setStoredEmail(session.email);
    }
    setPassword('');

    if (session?.isVerified === false) {
      navigate('/signup/verify');
    } else if (session?.isProfileUploaded === false) {
      navigate('/signup/organization');
    } else {
      navigate('/dashboard');
    }
  };

  const handleAdminSuccess = (tokenFromResponse?: string) => {
    if (tokenFromResponse) {
      handleTokenUpdate(tokenFromResponse);
    }
    if (firstName.trim()) {
      setStoredName(firstName.trim());
    }
    navigate('/dashboard');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={authToken ? '/dashboard' : '/login'} replace />}
      />

      {/* Auth & Onboarding Routes */}
      <Route
        path="/login"
        element={
          <EmailStep
            email={email}
            setEmail={setEmail}
            mode="login"
            onCheckComplete={handleEmailCheckComplete}
          />
        }
      />
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route
        path="/signup"
        element={
          <EmailStep
            email={email}
            setEmail={setEmail}
            mode="signup"
            onCheckComplete={handleEmailCheckComplete}
          />
        }
      />
      <Route
        path="/login/password"
        element={
          <LoginPasswordStep
            email={email}
            accountName={existingAccountName}
            password={password}
            setPassword={setPassword}
            onSuccess={handleLoginSuccess}
          />
        }
      />
      <Route
        path="/signup/create-account"
        element={
          <CreateAccountStep
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSuccess={handleCreateAccountSuccess}
          />
        }
      />
      <Route
        path="/signup/password"
        element={<Navigate to="/signup/create-account" replace />}
      />
      <Route
        path="/signup/verify"
        element={
          <VerifyEmailStep
            email={email}
            token={authToken}
            onTokenUpdate={handleTokenUpdate}
            onVerified={handleOtpVerified}
          />
        }
      />
      <Route
        path="/signup/organization"
        element={
          <OrganisationStep
            orgName={orgName}
            setOrgName={setOrgName}
            orgType={orgType}
            setOrgType={setOrgType}
            website={website}
            setWebsite={setWebsite}
            location={location}
            setLocation={setLocation}
            onSuccess={(response) => {
              if (typeof response?.data?.token === 'string' && response.data.token) {
                handleTokenUpdate(response.data.token);
              }
              navigate('/signup/admin');
            }}
          />
        }
      />
      <Route
        path="/signup/admin"
        element={
          <AdminStep
            email={email}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            onSuccess={(response) =>
              handleAdminSuccess(
                typeof response?.data?.token === 'string' ? response.data.token : undefined
              )
            }
          />
        }
      />

      {/* Protected Dashboard Routes (requires stored auth token) */}
      <Route
        path="/dashboard"
        element={
          authToken ? (
            <DashboardLayout firstName={firstName} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="drivers" replace />} />
        <Route path="drivers" element={<DriversEmptyState />} />
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
  );
}

export default App;
