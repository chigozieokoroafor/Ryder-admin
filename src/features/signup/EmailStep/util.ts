import { apiRequest, ONBOARDING_USER_TYPE, type UserType } from '../../../utils/api';

export interface CheckAuthPayload {
  userType: UserType;
  email: string;
}

export interface CheckAuthData {
  accountExist: boolean;
  name?: string;
}

export interface CheckAuthResponse {
  status: string;
  data: CheckAuthData;
  message: string;
}

export async function checkEmailAccount(email: string): Promise<CheckAuthResponse> {
  const payload: CheckAuthPayload = {
    userType: ONBOARDING_USER_TYPE,
    email: email.trim(),
  };

  return apiRequest<CheckAuthResponse>('/api/auth/check', {
    method: 'POST',
    body: payload,
    withAuth: false,
  });
}
