import {
  Bell,
  Globe,
  HelpCircle,
  ChevronRight,
  Shield,
  FileText,
  Info,
  Download,
  Star,
  Share2,
  Smartphone,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations, Language } from "../../data/translations";

export const Settings = () => {
  // Real theme and language state from localStorage
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    return saved || "dark";
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language | null;
    return saved || "en";
  });

  const [notifications, setNotifications] = useState(true);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // Apply theme to html element
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(`${theme}-mode`);
    // Trigger custom event for same-window communication
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "theme",
        newValue: theme,
        oldValue: theme === "dark" ? "light" : "dark",
      })
    );
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "language",
        newValue: language,
        oldValue: language === "en" ? "bn" : "en",
      })
    );
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const t = translations[language];

  // Theme-aware styles
  const isDark = theme === "dark";

  const glassCardStyle = {
    background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: `1px solid ${
      isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"
    }`,
    overflow: "hidden",
    marginBottom: "1.5rem",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1.5rem",
    borderBottom: `1px solid ${
      isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
    }`,
    cursor: "pointer",
    transition: "background 0.2s",
  };

  const iconBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
    marginRight: "1rem",
    color: isDark ? "#fff" : "#1a1a1a",
  };

  const sectionTitleStyle = {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
    marginLeft: "1rem",
    marginBottom: "0.75rem",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto",
        padding:
          window.innerWidth < 400
            ? "1rem 0.5rem 6rem 0.5rem"
            : window.innerHeight < 600
            ? "1rem 1rem 6rem 1rem"
            : "2rem 1.5rem",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          marginBottom: window.innerHeight < 600 ? "1.5rem" : "3rem",
          textAlign: "center",
        }}
      >
        <h2
          className="login-title"
          style={{
            fontSize: window.innerWidth < 400 ? "1.75rem" : "2.5rem",
            marginBottom: "0.25rem",
            color: isDark ? "white" : "#1a1a1a",
          }}
        >
          {t.settings}
        </h2>
        <p
          style={{
            fontSize: window.innerWidth < 400 ? "0.9rem" : "1.1rem",
            opacity: 0.6,
            textAlign: "center",
            margin: "0 auto",
            maxWidth: "400px",
            color: isDark ? "white" : "#1a1a1a",
          }}
        >
          {t.appPreferences}
        </p>
      </header>

      {/* Main Grid Layout for sections */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: window.innerWidth < 400 ? "1rem" : "2rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* App Settings Section */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionTitleStyle}>{t.appSettings}</div>
          <div style={glassCardStyle}>
            <div
              style={itemStyle}
              className="setting-item"
              onClick={toggleTheme}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ ...iconBoxStyle, color: "#fbbf24" }}>
                  {isDark ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <span>{t.appearance}</span>
              </div>
              <span
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.7,
                  marginRight: "0.5rem",
                }}
              >
                {isDark ? "Dark" : "Light"}
              </span>
            </div>

            <div
              style={itemStyle}
              className="setting-item"
              onClick={() => setNotifications(!notifications)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ ...iconBoxStyle, color: "#f472b6" }}>
                  <Bell size={20} />
                </div>
                <span>{t.notifications}</span>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "22px",
                  background: notifications
                    ? "#34d399"
                    : isDark
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                  borderRadius: "20px",
                  position: "relative",
                  transition: "background 0.3s",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    background: "#fff",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "2px",
                    left: notifications ? "20px" : "2px",
                    transition: "left 0.3s",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </div>

            <div
              style={{ ...itemStyle, borderBottom: "none" }}
              className="setting-item"
              onClick={() => setIsLanguageOpen(true)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ ...iconBoxStyle, color: "#a78bfa" }}>
                  <Globe size={20} />
                </div>
                <span>{t.language}</span>
              </div>
              <span
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.7,
                  marginRight: "0.5rem",
                }}
              >
                {language === "en" ? "English" : "বাংলা"}
              </span>
            </div>
          </div>
        </div>

        {/* About & Legal Section */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionTitleStyle}>{t.aboutLegal}</div>
          <div style={glassCardStyle}>
            <div style={itemStyle} className="setting-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ ...iconBoxStyle, color: "#a78bfa" }}>
                  <Smartphone size={20} />
                </div>
                <span>{t.appVersion}</span>
              </div>
              <span
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.5,
                  marginRight: "0.5rem",
                }}
              >
                v1.0.0
              </span>
            </div>

            {[
              { icon: Download, color: "#3b82f6", label: t.checkForUpdates },
              { icon: Star, color: "#fbbf24", label: t.rateApp },
              { icon: Share2, color: "#10b981", label: t.shareApp },
              { icon: Info, color: "#60a5fa", label: t.aboutApp },
              { icon: Shield, color: "#34d399", label: t.privacyPolicy },
              { icon: FileText, color: "#fbbf24", label: t.termsConditions },
              { icon: HelpCircle, color: "#f87171", label: t.helpSupport },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...itemStyle,
                  borderBottom:
                    idx === 6
                      ? "none"
                      : `1px solid ${
                          isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.05)"
                        }`,
                }}
                className="setting-item"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ ...iconBoxStyle, color: item.color }}>
                    <item.icon size={20} />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight
                  size={18}
                  style={{ opacity: 0.5, color: isDark ? "white" : "black" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "2rem",
          opacity: 0.3,
          fontSize: "0.8rem",
          color: isDark ? "white" : "black",
        }}
      >
        {t.appVersion} 1.0.0
      </p>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {isLanguageOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLanguageOpen(false)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                ...glassCardStyle,
                background: isDark
                  ? "rgba(30, 41, 59, 0.7)"
                  : "rgba(255, 255, 255, 0.9)",
                width: "100%",
                maxWidth: "320px",
                position: "relative",
                zIndex: 1,
                marginBottom: 0,
                padding: "1rem",
                color: isDark ? "white" : "#1a1a1a",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                }}
              >
                {t.selectLanguage}
              </h3>
              <div
                style={itemStyle}
                className="setting-item"
                onClick={() => handleLanguageChange("en")}
              >
                <span>English</span>
                {language === "en" && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#34d399",
                      boxShadow: "0 0 10px rgba(52, 211, 153, 0.5)",
                    }}
                  />
                )}
              </div>
              <div
                style={{ ...itemStyle, borderBottom: "none" }}
                className="setting-item"
                onClick={() => handleLanguageChange("bn")}
              >
                <span>বাংলা (Bangla)</span>
                {language === "bn" && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#34d399",
                      boxShadow: "0 0 10px rgba(52, 211, 153, 0.5)",
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
