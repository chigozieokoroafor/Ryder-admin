import { apiRequest, ONBOARDING_USER_TYPE, type UserType } from '../../../utils/api';
import type { AuthSessionData } from '../CreateAccountStep/util';

export interface SignInPayload {
  email: string;
  password: string;
  userType: UserType;
}

export interface SignInResponse {
  status: string;
  data: AuthSessionData;
  message: string;
}

export async function signInAccount(email: string, password: string): Promise<SignInResponse> {
  const payload: SignInPayload = {
    email: email.trim(),
    password,
    userType: ONBOARDING_USER_TYPE,
  };

  return apiRequest<SignInResponse>('/api/auth/sign-in', {
    method: 'POST',
    body: payload,
    withAuth: false,
  });
}
