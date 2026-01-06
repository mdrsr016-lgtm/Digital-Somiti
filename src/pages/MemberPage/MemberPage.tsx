import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/mainlogo.svg";
import { translations, Language } from "../../data/translations";
import { ThemeToggle } from "../../components/common/ThemeToggle";
import { LanguageSelector } from "../../components/common/LanguageSelector";
import {
  LogOut,
  User as UserIcon,
  Mail,
  Phone,
  TrendingUp,
  DollarSign,
  PieChart,
} from "lucide-react";
import { BottomNav } from "../../components/common/BottomNav";

export const MemberPage = () => {
  const navigate = useNavigate();
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

  // Mock data for the member
  const memberData = {
    fullName: "Member User",
    username: "member_01",
    email: "member@example.com",
    phone: "+880 1234 567890",
    totalInvestment: "50,000 BDT",
    currentValue: "55,250 BDT",
    roi: "+10.5%",
  };

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
        <div className="login-card" style={{ maxWidth: "800px", width: "90%" }}>
          <header className="login-header">
            <div className="brand-identity">
              <img
                src={logo}
                alt="Digital Somiti Logo"
                className="brand-icon"
              />
              <h1 className="brand-name">{t.brandName}</h1>
            </div>
            <h2 className="login-title">{t.dashboard}</h2>
            <p className="login-subtitle">
              Welcome back, {memberData.fullName}
            </p>
          </header>

          <div
            className="member-content"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
              textAlign: "left",
            }}
          >
            {/* Personal Information */}
            <section
              className="info-section"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "1.5rem",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  color: "var(--color-blue-primary)",
                }}
              >
                <UserIcon size={20} /> {t.personalInfo}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                    {t.fullName}
                  </label>
                  <div style={{ fontSize: "1rem", fontWeight: "500" }}>
                    {memberData.fullName}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                    {t.username}
                  </label>
                  <div style={{ fontSize: "1rem", fontWeight: "500" }}>
                    {memberData.username}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Mail size={16} style={{ opacity: 0.6 }} />
                  <div>
                    <label style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                      {t.email}
                    </label>
                    <div style={{ fontSize: "1rem", fontWeight: "500" }}>
                      {memberData.email}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Phone size={16} style={{ opacity: 0.6 }} />
                  <div>
                    <label style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                      {t.phone}
                    </label>
                    <div style={{ fontSize: "1rem", fontWeight: "500" }}>
                      {memberData.phone}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Summary */}
            <section
              className="info-section"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "1.5rem",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  color: "var(--color-green-success)",
                }}
              >
                <PieChart size={20} /> {t.investmentSummary}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <DollarSign size={16} style={{ opacity: 0.6 }} />
                    <span style={{ fontSize: "0.9rem" }}>
                      {t.totalInvestment}
                    </span>
                  </div>
                  <span style={{ fontWeight: "600" }}>
                    {memberData.totalInvestment}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <TrendingUp size={16} style={{ opacity: 0.6 }} />
                    <span style={{ fontSize: "0.9rem" }}>{t.currentValue}</span>
                  </div>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "var(--color-green-success)",
                    }}
                  >
                    {memberData.currentValue}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "0.75rem",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "0.9rem" }}>{t.roi}</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "var(--color-green-success)",
                    }}
                  >
                    {memberData.roi}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <button className="submit-button" style={{ marginTop: "1.5rem" }}>
            {t.editProfile}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
