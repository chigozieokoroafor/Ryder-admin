import { apiRequest, ONBOARDING_USER_TYPE, type UserType } from '../../../utils/api';
import {
  validatePassword,
  isPasswordFullyValid,
  type PasswordCriteria,
} from '../PasswordStep/util';

export { validatePassword, isPasswordFullyValid, type PasswordCriteria };

export interface SignUpPayload {
  email: string;
  password: string;
  userType: UserType;
}

export interface AuthSessionData {
  token: string;
  userType: UserType | string;
  isVerified: boolean;
  isProfileUploaded: boolean;
  email: string;
}

export interface SignUpResponse {
  status: string;
  data: AuthSessionData;
  message: string;
}

export async function signUpAccount(email: string, password: string): Promise<SignUpResponse> {
  const payload: SignUpPayload = {
    email: email.trim(),
    password,
    userType: ONBOARDING_USER_TYPE,
  };

  return apiRequest<SignUpResponse>('/api/auth/sign-up', {
    method: 'POST',
    body: payload,
    withAuth: false,
  });
}
