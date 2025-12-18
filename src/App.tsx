import { Mail, Lock, Eye, EyeOff, Chrome, Apple } from 'lucide-react';
import { useState } from 'react';
import logo from './assets/logo.svg';

function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="landing-page">
      <div className="hero-background" />
      <div className="content-wrapper">
        <div className="login-card">
          <header className="login-header">
            <div className="login-logo-container">
              <img src={logo} alt="Digital Somiti Logo" style={{ width: '40px' }} />
            </div>
            <h1 className="login-title">Sign in with email</h1>
            <p className="login-subtitle">
              Your Digital Micro-Savings Partner. Secure, fast, and reliable.
            </p>
          </header>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                placeholder="Email" 
                className="login-input" 
                required 
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="login-input" 
                required 
              />
              <div 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <a href="#" className="forgot-password">Forgot password?</a>

            <button type="submit" className="submit-button">
              Get Started
            </button>
          </form>

          <div className="divider">Or sign in with</div>

          <div className="social-buttons">
            <button className="social-btn" title="Google">
              <Chrome className="social-icon" />
            </button>
            <button className="social-btn" title="Facebook">
              <svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="social-icon"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </button>
            <button className="social-btn" title="Apple">
              <Apple className="social-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
