import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { translations, Language } from "../data/translations";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";
import {
  User,
  LayoutDashboard,
  LogOut,
  TrendingUp,
  Wallet,
  History,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/logo.svg";

export const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || "en"
  );

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`min-h-screen ${theme}-mode lang-${language}`}>
      <div className="hero-background"></div>

      <div className="header-controls">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/10 border-b border-white/5">
        <div className="brand-identity scale-75 md:scale-90">
          <img src={logo} alt="Logo" className="brand-icon" />
          <h1 className="brand-name">{t.brandName}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/investor/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-primary/20 flex items-center justify-center border border-blue-primary/30 group-hover:border-blue-primary transition-colors">
              <User size={16} className="text-blue-primary" />
            </div>
            <span className="hidden md:inline font-medium">{t.profile}</span>
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
            title={t.logout}
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="content-wrapper pt-32 pb-12 px-4">
        <div className="max-w-6xl w-full mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">
                Investor {t.dashboard}
              </h2>
              <p className="text-lg opacity-60">
                Welcome back! Here's what's happening with your investments.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-2xl bg-blue-primary text-white font-semibold shadow-lg shadow-blue-primary/25 hover:scale-105 active:scale-95 transition-all">
                New Investment
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="login-card !max-w-none p-6 space-y-4 hover:border-blue-primary/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-blue-primary/10 text-blue-primary">
                  <Wallet size={24} />
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                  +৳1,250
                </span>
              </div>
              <div>
                <p className="text-sm opacity-50 font-medium uppercase tracking-wider">
                  {t.totalInvestment}
                </p>
                <h3 className="text-3xl font-bold">৳ 25,000</h3>
              </div>
            </div>

            <div className="login-card !max-w-none p-6 space-y-4 hover:border-green-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
                  <TrendingUp size={24} />
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                  12.5% Yearly
                </span>
              </div>
              <div>
                <p className="text-sm opacity-50 font-medium uppercase tracking-wider">
                  {t.roi}
                </p>
                <h3 className="text-3xl font-bold">12.5%</h3>
              </div>
            </div>

            <div className="login-card !max-w-none p-6 space-y-4 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                  <History size={24} />
                </div>
                <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-lg">
                  Last: 2 days ago
                </span>
              </div>
              <div>
                <p className="text-sm opacity-50 font-medium uppercase tracking-wider">
                  Active Plans
                </p>
                <h3 className="text-3xl font-bold">03</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <div className="login-card !max-w-none p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-xl font-bold">Recent Transactions</h3>
                  <button className="text-sm text-blue-primary font-semibold hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                          <Wallet size={20} className="opacity-60" />
                        </div>
                        <div>
                          <p className="font-bold">Monthly Investment</p>
                          <p className="text-sm opacity-50">
                            Dec 15, 2025 • Plan A
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-500">+৳5,000</p>
                        <p className="text-xs opacity-50">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Summary Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="login-card !max-w-none p-8 text-center space-y-6">
                <div className="relative mx-auto w-24 h-24 rounded-full border-4 border-blue-primary/20 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Investor`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Investor User</h3>
                  <p className="text-sm opacity-60">
                    Premium Investor since 2024
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div className="text-center">
                    <p className="text-xs opacity-50 uppercase font-bold">
                      Status
                    </p>
                    <p className="text-green-500 font-bold">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs opacity-50 uppercase font-bold">
                      Badge
                    </p>
                    <p className="text-blue-primary font-bold">Gold</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/investor/profile")}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-semibold group"
                >
                  Manage {t.profile}
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
