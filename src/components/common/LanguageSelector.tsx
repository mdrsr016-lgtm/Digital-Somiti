import { Globe } from "lucide-react";
import { useState } from "react";
import { Language } from "../data/translations";

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function LanguageSelector({
  language,
  setLanguage,
}: LanguageSelectorProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
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
  );
}
