import { apiRequest } from '../../../utils/api';

export interface CreateOrganizationProfilePayload {
  name: string;
  address: string;
  organizationType: string;
}

export interface CreateOrganizationProfileResponse {
  status?: string;
  message?: string;
  msg?: string;
  data?: {
    token?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export const ORGANIZATION_TYPES: string[] = [
  'University',
  'Education',
  'Company',
  'Non-Profit',
  'Other',
];

export async function createOrganizationProfile(
  payload: CreateOrganizationProfilePayload
): Promise<CreateOrganizationProfileResponse> {
  return apiRequest<CreateOrganizationProfileResponse>('/api/organization/profile/create', {
    method: 'POST',
    body: {
      name: payload.name.trim(),
      address: payload.address.trim(),
      organizationType: payload.organizationType,
    },
  });
}
