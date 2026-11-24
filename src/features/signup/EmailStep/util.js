import { apiRequest, ONBOARDING_USER_TYPE } from '../../../utils/api';

export async function checkEmailAccount(email) {
  const data = await apiRequest('/api/auth/check', {
    method: 'POST',
    body: {
      userType: ONBOARDING_USER_TYPE,
      email: email.trim(),
    },
  });

  const accountExists =
    data?.exists ??
    data?.data?.exists ??
    data?.accountExists ??
    data?.data?.accountExists ??
    false;

  if (accountExists) {
    throw new Error(data?.message || 'An account with this email already exists.');
  }

  return data;
}
