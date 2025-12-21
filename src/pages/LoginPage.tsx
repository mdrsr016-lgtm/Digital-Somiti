import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { translations, Language } from "../data/translations";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";
import { ForgotPasswordModal } from "../components/ForgotPasswordModal";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    return saved || "dark";
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language | null;
    return saved || "en";
  });

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check credentials and route accordingly
    if (userId === "mem" && password === "mem") {
      navigate("/member/profile");
    } else if (userId === "inv" && password === "inv") {
      navigate("/investor/profile");
    } else if (userId === "adm" && password === "adm") {
      navigate("/admin");
    } else {
      // Simple error handling for invalid credentials
      alert(t.loginError || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={`landing-page ${theme}-mode lang-${language}`}>
      <div className="header-controls">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>

      <div className="content-wrapper">
        <div className="login-card">
          <header className="login-header">
            <div className="brand-identity">
              <img
                src={logo}
                alt="Digital Somiti Logo"
                className="brand-icon"
              />
              <h1 className="brand-name">{t.brandName}</h1>
            </div>
            <h2 className="login-title">{t.loginTitle}</h2>
            <p className="login-subtitle">{t.loginSubtitle}</p>
          </header>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder={t.userIdPlaceholder}
                className="login-input"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                className="login-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <a
              href="#"
              className="forgot-password"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              {t.forgotPassword}
            </a>

            <button type="submit" className="submit-button">
              {t.getStarted}
            </button>
          </form>
        </div>
      </div>

      <ForgotPasswordModal
        show={showModal}
        onClose={() => setShowModal(false)}
        language={language}
      />
    </div>
  );
};
