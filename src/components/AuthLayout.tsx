import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  showLoginLink?: boolean;
  showSignupLink?: boolean;
  footerText?: ReactNode;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showLoginLink = false,
  showSignupLink = false,
  footerText,
}: AuthLayoutProps) {
  return (
    <div className="layout">
      <header className="navbar">
        <div className="logo">
          <span className="logo-text">riyder</span>
        </div>
        {showLoginLink && (
          <div className="nav-right">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        )}
        {!showLoginLink && showSignupLink && (
          <div className="nav-right">
            Don't have an account?{' '}
            <Link to="/signup" className="login-link">
              Create account
            </Link>
          </div>
        )}
      </header>

      <main className="main-content">
        <div className="card">
          {title && <h1 className="card-title">{title}</h1>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}

          {(title || subtitle) && <div className="divider"></div>}

          {children}
        </div>

        {footerText || (
          <p className="footer-text">
            By creating an account, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        )}
      </main>
    </div>
  );
}
