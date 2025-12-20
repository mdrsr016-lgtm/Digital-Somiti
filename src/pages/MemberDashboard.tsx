import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { translations, Language } from "../data/translations";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";
import {
  User,
  LogOut,
  Wallet,
  ChevronRight,
  PiggyBank,
  CreditCard,
} from "lucide-react";
import logo from "../assets/logo.svg";

export const MemberDashboard = () => {
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
            onClick={() => navigate("/member/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 group-hover:border-green-500 transition-colors">
              <User size={16} className="text-green-500" />
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
                Member {t.dashboard}
              </h2>
              <p className="text-lg opacity-60">
                Welcome back! Here's your membership overview.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-2xl bg-green-500 text-white font-semibold shadow-lg shadow-green-500/25 hover:scale-105 active:scale-95 transition-all">
                Make Payment
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat-card-green p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-glow-green">
                  <Wallet size={24} className="text-green-500" />
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-lg">
                  This Month
                </span>
              </div>
              <div>
                <p className="text-sm opacity-60 font-medium uppercase tracking-wider">
                  Total Contributions
                </p>
                <h3 className="text-4xl font-bold mt-2">৳ 15,000</h3>
                <p className="text-xs opacity-40 mt-1">On track</p>
              </div>
            </div>

            <div className="stat-card-blue p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-glow-blue">
                  <CreditCard size={24} className="text-blue-primary" />
                </div>
                <span className="text-xs font-bold text-blue-primary bg-blue-primary/10 px-3 py-1.5 rounded-lg">
                  Active
                </span>
              </div>
              <div>
                <p className="text-sm opacity-60 font-medium uppercase tracking-wider">
                  Active Loans
                </p>
                <h3 className="text-4xl font-bold mt-2">৳ 8,500</h3>
                <p className="text-xs opacity-40 mt-1">6 months remaining</p>
              </div>
            </div>

            <div className="stat-card-purple p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-glow-purple">
                  <PiggyBank size={24} className="text-purple-500" />
                </div>
                <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-3 py-1.5 rounded-lg">
                  Growing
                </span>
              </div>
              <div>
                <p className="text-sm opacity-60 font-medium uppercase tracking-wider">
                  Savings Balance
                </p>
                <h3 className="text-4xl font-bold mt-2">৳ 42,000</h3>
                <p className="text-xs opacity-40 mt-1">+৳2,500 this month</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold">Recent Activity</h3>
                  <button className="text-sm text-green-500 font-semibold hover:underline flex items-center gap-1 px-4 py-2 rounded-xl hover:bg-green-500/10 transition-all">
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: "Monthly Contribution",
                      date: "Dec 19, 2025",
                      type: "Savings",
                      amount: "+৳2,500",
                      status: "Completed",
                      color: "green",
                    },
                    {
                      title: "Loan Payment",
                      date: "Dec 15, 2025",
                      type: "Loan #1234",
                      amount: "-৳1,500",
                      status: "Processed",
                      color: "blue",
                    },
                    {
                      title: "Monthly Contribution",
                      date: "Nov 19, 2025",
                      type: "Savings",
                      amount: "+৳2,500",
                      status: "Completed",
                      color: "green",
                    },
                  ].map((transaction, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-5 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-white/5 hover:border-white/10 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={
                            transaction.color === "green"
                              ? "w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                              : "w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
                          }
                        >
                          <Wallet
                            size={24}
                            className={
                              transaction.color === "green"
                                ? "text-green-500 opacity-80"
                                : "text-blue-500 opacity-80"
                            }
                          />
                        </div>
                        <div>
                          <p className="font-bold text-lg">
                            {transaction.title}
                          </p>
                          <p className="text-sm opacity-60">
                            {transaction.date} • {transaction.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-lg ${
                            transaction.amount.startsWith("+")
                              ? "text-green-500"
                              : "text-blue-400"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                        <p className="text-xs opacity-50">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Summary Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card-elevated p-8 text-center space-y-6">
                <div className="relative mx-auto w-28 h-28 rounded-full border-4 border-green-500/30 p-1 hover:border-green-500 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white/10">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Member`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Member User</h3>
                  <p className="text-sm opacity-60 mt-1">
                    Active Member since 2023
                  </p>
                  <div className="mt-3">
                    <span className="badge-success">✓ Verified Member</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                  <div className="text-center">
                    <p className="text-xs opacity-50 uppercase font-bold mb-1">
                      Status
                    </p>
                    <span className="badge-success text-xs">● Active</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs opacity-50 uppercase font-bold mb-1">
                      Tier
                    </p>
                    <p className="text-green-500 font-bold">Standard</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/member/profile")}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-500/80 text-white font-semibold shadow-lg shadow-green-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
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
