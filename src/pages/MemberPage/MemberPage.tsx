import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { translations, Language } from "../../data/translations";
import { ThemeToggle } from "../../components/common/ThemeToggle";
import { LanguageSelector } from "../../components/common/LanguageSelector";
import { LogOut } from "lucide-react";
import { BottomNav } from "../../components/common/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

export const MemberPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    return saved || "dark";
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language | null;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    navigate("/");
  };

  const t = translations[language];

  return (
    <div className={`landing-page ${theme}-mode lang-${language}`}>
      <div className="header-controls">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <button
          className="theme-toggle"
          onClick={handleLogout}
          title={t.logout}
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="content-wrapper" style={{ paddingBottom: "6rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};
