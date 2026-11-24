import { apiRequest } from '../../../utils/api';

export interface UpdateAdminProfilePayload {
  name: string;
}

export interface UpdateAdminProfileResponse {
  status?: string;
  message?: string;
  msg?: string;
  data?: {
    token?: string;
    name?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export function formatAdminFullName(firstName: string, lastName: string): string {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
}

export async function uploadAdminProfile(
  firstName: string,
  lastName: string
): Promise<UpdateAdminProfileResponse> {
  const payload: UpdateAdminProfilePayload = {
    name: formatAdminFullName(firstName, lastName),
  };

  return apiRequest<UpdateAdminProfileResponse>('/api/profile/me', {
    method: 'POST',
    body: payload,
  });
}
