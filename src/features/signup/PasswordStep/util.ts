export interface PasswordCriteria {
  uppercase: boolean;
  lowercase: boolean;
  special: boolean;
  number: boolean;
  length: boolean;
}

export const validatePassword = (password: string): PasswordCriteria => {
  return {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
  };
};

export const isPasswordFullyValid = (criteria: PasswordCriteria): boolean => {
  return Object.values(criteria).every(Boolean);
};

