import logo from './assets/logo.svg';

function App() {
  return (
    <div className="landing-page">
      <div className="hero-background" />
      <div className="content-wrapper">
        <img src={logo} alt="Digital Somiti Logo" style={{ width: '120px', marginBottom: '2rem' }} />
        <h1 style={{ 
          fontSize: '4.5rem', 
          marginBottom: '1rem', 
          color: 'var(--color-primary-green)',
          textShadow: '0 0 20px rgba(94, 175, 115, 0.3)'
        }}>
          Digital Somiti
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          opacity: 0.9, 
          fontFamily: 'var(--font-primary)',
          letterSpacing: '1px'
        }}>
          Your Digital Micro-Savings Partner
        </p>
      </div>
    </div>
  );
}

export default App;
