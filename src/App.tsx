import { User, Lock, Eye, EyeOff, Sun, Moon, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "./assets/logo.svg";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as
      | "en"
      | "bn"
      | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

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

  const selectLanguage = (lang: "en" | "bn") => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  // Translations
  const translations = {
    en: {
      brandName: "Digital Somiti",
      loginTitle: "Sign in to continue",
      loginSubtitle: "Securely access your Digital Somiti dashboard",
      memberIdPlaceholder: "Member ID",
      passwordPlaceholder: "Password",
      forgotPassword: "Forgot password?",
      getStarted: "Log in",
      modalTitle: "Reset Password",
      modalMessage: "Please contact the admin to reset your password.",
      modalButton: "Got it",
    },
    bn: {
      brandName: "ডিজিটাল সমিতি",
      loginTitle: "চালিয়ে যেতে সাইন ইন করুন",
      loginSubtitle: "নিরাপদে আপনার ডিজিটাল সমিতি ড্যাশবোর্ডে প্রবেশ করুন",
      memberIdPlaceholder: "সদস্য আইডি",
      passwordPlaceholder: "পাসওয়ার্ড",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      getStarted: "লগ ইন করুন",
      modalTitle: "পাসওয়ার্ড রিসেট করুন",
      modalMessage:
        "আপনার পাসওয়ার্ড রিসেট করতে অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।",
      modalButton: "ঠিক আছে",
    },
  };

  const t = translations[language];

  return (
    <div className={`landing-page ${theme}-mode lang-${language}`}>
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Language Toggle Button */}
      <div className="language-selector">
        <button
          className="language-toggle"
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          aria-label="Select language"
        >
          <Globe size={20} />
        </button>

        {showLanguageMenu && (
          <div className="language-menu">
            <button
              className={`language-option ${language === "en" ? "active" : ""}`}
              onClick={() => selectLanguage("en")}
            >
              <span className="flag">🇬🇧</span>
              <span className="language-name">English</span>
            </button>
            <button
              className={`language-option ${language === "bn" ? "active" : ""}`}
              onClick={() => selectLanguage("bn")}
            >
              <span className="flag">🇧🇩</span>
              <span className="language-name">বাংলা</span>
            </button>
          </div>
        )}
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

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder={t.memberIdPlaceholder}
                className="login-input"
                required
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{t.modalTitle}</h3>
            <p className="modal-message">{t.modalMessage}</p>
            <button
              className="modal-button"
              onClick={() => setShowModal(false)}
            >
              {t.modalButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
