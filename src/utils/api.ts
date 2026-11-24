export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export type UserType = 'organization' | 'driver' | 'passenger';
export const ONBOARDING_USER_TYPE: UserType = 'organization';

const TOKEN_STORAGE_KEY = 'riyder_auth_token';
const EMAIL_STORAGE_KEY = 'riyder_auth_email';
const NAME_STORAGE_KEY = 'riyder_account_name';

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  unauthorizedHandler = handler;
}

export function getStoredToken(): string {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
}

export function setStoredToken(token: string): void {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function getStoredEmail(): string {
  return localStorage.getItem(EMAIL_STORAGE_KEY) || '';
}

export function setStoredEmail(email: string): void {
  if (email) {
    localStorage.setItem(EMAIL_STORAGE_KEY, email);
  } else {
    localStorage.removeItem(EMAIL_STORAGE_KEY);
  }
}

export function getStoredName(): string {
  return localStorage.getItem(NAME_STORAGE_KEY) || '';
}

export function setStoredName(name: string): void {
  if (name) {
    localStorage.setItem(NAME_STORAGE_KEY, name);
  } else {
    localStorage.removeItem(NAME_STORAGE_KEY);
  }
}

export function clearStoredAuth(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(EMAIL_STORAGE_KEY);
  localStorage.removeItem(NAME_STORAGE_KEY);
}

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
  withAuth?: boolean;
  headers?: Record<string, string>;
}

export class ApiError<T = unknown> extends Error {
  status: number;
  data: T | null;

  constructor(message: string, status: number, data: T | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest<T = Record<string, unknown>>(
  endpoint: string,
  { method = 'GET', body, token, withAuth = true, headers = {} }: ApiRequestOptions = {}
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const resolvedToken = token ?? (withAuth ? getStoredToken() : '');
  if (resolvedToken) {
    requestHeaders.Authorization = `Bearer ${resolvedToken}`;
  }

  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${normalizedEndpoint}`, config);

  let data: Record<string, unknown> | null = null;
  if (response.status !== 204) {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = (await response.json()) as Record<string, unknown>;
    } else {
      const text = await response.text();
      try {
        data = text ? (JSON.parse(text) as Record<string, unknown>) : null;
      } catch {
        data = { message: text };
      }
    }
  }

  if (!response.ok) {
    if (response.status === 401 && normalizedEndpoint !== '/api/auth/sign-in') {
      setStoredToken('');
      if (unauthorizedHandler) {
        unauthorizedHandler();
      } else {
        window.location.replace('/login');
      }
    }

    const errorMessage =
      (typeof data?.message === 'string' && data.message) ||
      (typeof data?.msg === 'string' && data.msg) ||
      (typeof data?.error === 'string' && data.error) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status, data);
  }

  return data as T;
}
