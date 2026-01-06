import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { translations, Language } from "../../data/translations";
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
    // Apply theme to html element
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(`${theme}-mode`);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Listen for theme and language changes from Settings page
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        setTheme(e.newValue as "light" | "dark");
      }
      if (e.key === "language" && e.newValue) {
        setLanguage(e.newValue as Language);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const t = translations[language];

  return (
    <div className={`landing-page lang-${language}`}>
      <div className="header-controls">
        <button
          className="control-button"
          onClick={handleLogout}
          title={t.logout}
        >
          <LogOut size={18} />
        </button>
      </div>

      <div
        className="content-wrapper"
        style={{
          paddingBottom: window.innerHeight < 600 ? "4.5rem" : "6rem",
          paddingLeft: window.innerWidth < 400 ? "0.5rem" : "1.5rem",
          paddingRight: window.innerWidth < 400 ? "0.5rem" : "1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, position: "absolute" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ gridColumn: 1, gridRow: 1, width: "100%" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};
