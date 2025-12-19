import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import { translations, Language } from "./data/translations";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageSelector } from "./components/LanguageSelector";
import { ForgotPasswordModal } from "./components/ForgotPasswordModal";
import { supabase } from "./lib/supabase";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate with Supabase Auth
      // Note: We are using "userId" as email for now if it contains @, else we assume it's a custom ID
      // But Supabase Auth typically requires email.
      // Strategy:
      // Option A: Ensure userId is email.
      // Option B: Query `profiles` to get email from `user_id_custom`, then sign in.
      // For simplicity/robustness, let's assume the user enters Email for now,
      // OR we can try to look up the email if we had an Edge Function.
      // WITHOUT Edge Function: We must ask user for Email or map CustomID -> Email on client (insecure/hard).

      // Let's assume the input is EMAIL for the auth step, OR we accept the limitation of current Supabase Auth.
      // However, the prompt implies "id start with mem/inv/adm".
      // To support non-email login (e.g. usernames or custom IDs), we need a lookup step.
      // BUT we can't lookup without being auth'd (unless public read is on).
      // Assuming public read is on for profiles (we set that policy).

      let emailToLogin = userId;

      // Check if it looks like an email
      if (!userId.includes("@")) {
        // Attempt to find the email associated with this custom user_id
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("email"); // Wait, we can't query auth.users email from public table easily usually.
        // Actually the profile table should probably assume we store email there or we expect email input.
        // RETRY STRATEGY:
        // Since this is a new setup, let's Stick to Email Login for Auth, BUT check the Role after.
        // OR, if the user REALLY wants 'mem...' login, we'd need to store that in `profiles` and mapped to a real user.
        // If we assume the "User ID" input IS the email, proceeding.
        // If the "User ID" is "mem123", we can't easily sign in without a custom mapping.

        // FOR NOW: Let's assume the user enters EMAIL to login, OR we implement a "fake" email generator "mem123@digitalsomiti.local".
        emailToLogin = `${userId}@dsbd.com`; // Mock domain for custom IDs
      }

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: emailToLogin,
          password: password,
        });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Fetch User Profile to get Role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single();

        if (profileError) {
          // Fallback if profile missing
          console.error("Profile fetch error:", profileError);
          throw new Error("Profile not found");
        }

        const role = profile?.role;
        alert(
          `Logged in successfully! Role: ${
            role ? role.toUpperCase() : "UNKNOWN"
          }`
        );
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
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

            {error && (
              <p
                className="error-message"
                style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}
              >
                {error}
              </p>
            )}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Loading..." : t.getStarted}
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
}

export default App;
