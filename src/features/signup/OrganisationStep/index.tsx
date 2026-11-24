import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import {
  createOrganizationProfile,
  ORGANIZATION_TYPES,
  type CreateOrganizationProfileResponse,
} from './util';

export interface OrganisationStepProps {
  orgName: string;
  setOrgName: Dispatch<SetStateAction<string>>;
  orgType: string;
  setOrgType: Dispatch<SetStateAction<string>>;
  website: string;
  setWebsite: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  onSuccess: (response: CreateOrganizationProfileResponse) => void;
}

export default function OrganisationStep({
  orgName,
  setOrgName,
  orgType,
  setOrgType,
  website,
  setWebsite,
  location,
  setLocation,
  onSuccess,
}: OrganisationStepProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!orgName.trim()) {
      setError('Please enter your organisation name.');
      return;
    }

    if (!orgType) {
      setError('Please select an organisation type.');
      return;
    }

    if (!location.trim()) {
      setError('Please enter your organisation location.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await createOrganizationProfile({
        name: orgName,
        address: location,
        organizationType: orgType,
      });
      onSuccess(response);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to create organisation profile. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Organisation Information"
      subtitle="This is how Riyder will identify your organisation."
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="orgName">Organisation name</label>
          <input
            type="text"
            id="orgName"
            value={orgName}
            onChange={(e) => {
              setOrgName(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="orgType">Organisation type</label>
          <select
            id="orgType"
            value={orgType}
            onChange={(e) => {
              setOrgType(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
          >
            <option value="" disabled>
              Select organisation type
            </option>
            {ORGANIZATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group" style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="website">
            Website <span className="label-optional">(optional)</span>
          </label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <p className="input-helper-text" style={{ marginBottom: '1.5rem' }}>
          This helps verify your organisation.
        </p>

        <div className="input-group">
          <label htmlFor="location">Where are you located?</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Next: Admin Information'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
