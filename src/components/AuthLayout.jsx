import React from 'react';

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showLoginLink = false,
  footerText
}) {
  return (
    <div className="layout">
      <header className="navbar">
        <div className="logo">
          <span className="logo-text">riyder</span>
        </div>
        {showLoginLink && (
          <div className="nav-right">
            Already have an account? <a href="#" className="login-link">Login</a>
          </div>
        )}
      </header>

      <main className="main-content">
        <div className="card">
          {title && <h1 className="card-title">{title}</h1>}
          {subtitle && (
            typeof subtitle === 'string' 
              ? <p className="card-subtitle">{subtitle}</p>
              : <p className="card-subtitle">{subtitle}</p>
          )}
          
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
