import { apiRequest, ONBOARDING_USER_TYPE, type UserType } from '../../../utils/api';
import type { AuthSessionData } from '../CreateAccountStep/util';

export const OTP_LENGTH = 6;

export interface VerifyOtpPayload {
  otp: string;
  token: string;
}

export interface VerifyOtpResponse {
  status: string;
  data: AuthSessionData;
  message: string;
}

export interface ResendOtpPayload {
  userType: UserType;
  email: string;
}

export interface ResendOtpResponse {
  msg?: string;
  message?: string;
  data?: {
    token?: string;
  };
}

export async function verifyAccountOtp(otp: string, token: string): Promise<VerifyOtpResponse> {
  const payload: VerifyOtpPayload = {
    otp: otp.trim().toUpperCase(),
    token,
  };

  return apiRequest<VerifyOtpResponse>('/api/auth/otp/verify', {
    method: 'POST',
    body: payload,
    withAuth: false,
  });
}

export async function resendAccountOtp(email: string): Promise<ResendOtpResponse> {
  const payload: ResendOtpPayload = {
    userType: ONBOARDING_USER_TYPE,
    email: email.trim(),
  };

  return apiRequest<ResendOtpResponse>('/api/auth/otp/resend', {
    method: 'POST',
    body: payload,
    withAuth: false,
  });
}
