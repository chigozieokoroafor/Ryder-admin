import {
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import AuthLayout from '../../../components/AuthLayout';
import type { AuthSessionData } from '../CreateAccountStep/util';
import { OTP_LENGTH, resendAccountOtp, verifyAccountOtp } from './util';

export interface VerifyEmailStepProps {
  email: string;
  token: string;
  onTokenUpdate: (newToken: string) => void;
  onVerified: (session: AuthSessionData) => void;
}

export default function VerifyEmailStep({
  email,
  token,
  onTokenUpdate,
  onVerified,
}: VerifyEmailStepProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [resendMessage, setResendMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResendMessage('');

    const otp = digits.join('').trim().toUpperCase();
    if (otp.length < OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-character verification code.`);
      return;
    }

    if (!token) {
      setError('Verification token missing. Please request a new verification code.');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await verifyAccountOtp(otp, token);
      onVerified(response.data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Invalid or expired verification code. Please try again.';
      setError(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isResending || isVerifying) return;

    setError('');
    setResendMessage('');

    if (!email.trim()) {
      setError('Email address is missing. Please go back and enter your email.');
      return;
    }

    setIsResending(true);
    try {
      const response = await resendAccountOtp(email);
      if (response?.data?.token) {
        onTokenUpdate(response.data.token);
      }
      setDigits(Array(OTP_LENGTH).fill(''));
      setResendMessage(response?.msg || response?.message || 'Otp sent.');
      const firstInput = document.getElementById('code-0') as HTMLInputElement | null;
      if (firstInput) firstInput.focus();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to resend verification code. Please try again.';
      setError(message);
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const value = cleaned.slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);
    if (error) setError('');
    if (resendMessage) setResendMessage('');

    if (value && index < OTP_LENGTH - 1) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement | null;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement | null;
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const nextDigits = [...digits];
    for (let i = 0; i < pasted.length; i += 1) {
      nextDigits[i] = pasted[i];
    }
    setDigits(nextDigits);
    if (error) setError('');
    if (resendMessage) setResendMessage('');

    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    const targetInput = document.getElementById(`code-${focusIdx}`) as HTMLInputElement | null;
    if (targetInput) targetInput.focus();
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle={
        <>
          We've sent a verification code to <strong>{email || 'your email'}</strong>. Enter it below.
        </>
      }
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Secure code</label>
          <div className="code-inputs">
            {digits.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                autoComplete="one-time-code"
                maxLength={1}
                className="code-input"
                placeholder="0"
                value={digit}
                onChange={(e) => handleCodeChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                disabled={isVerifying}
                style={{ textTransform: 'uppercase' }}
              />
            ))}
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}
        {resendMessage && <p className="form-success">{resendMessage}</p>}

        <p className="helper-text">
          Has your code expired? Don't see the email? Check your spam or{' '}
          <a href="#resend" className="link" onClick={handleResend}>
            {isResending ? 'sending new verification code...' : 'request a new verification code.'}
          </a>
        </p>

        <div className="divider"></div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Confirm'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
