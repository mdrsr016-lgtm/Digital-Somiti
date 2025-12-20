import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { translations, Language } from "../data/translations";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";
import {
  User,
  Mail,
  Phone,
  PiggyBank,
  CreditCard,
  ArrowLeft,
  LogOut,
  Shield,
  Bell,
  Camera,
  Edit2,
  TrendingUp,
} from "lucide-react";
import logo from "../assets/logo.svg";

export const MemberProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || "en"
  );

  const t = translations[language];

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme}-mode`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme}-mode lang-${language}`}>
      <div className="hero-background"></div>

      <div className="header-controls">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>

      <main className="content-wrapper py-12 px-4">
        <div className="max-w-4xl w-full mx-auto space-y-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/member")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={18} />
              <span>{t.dashboard}</span>
            </button>
            <div className="brand-identity scale-75 md:scale-100">
              <img src={logo} alt="Logo" className="brand-icon" />
              <h1 className="brand-name">{t.brandName}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">{t.logout}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Quick Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="glass-card-elevated items-center p-8 text-center relative">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500/30 group-hover:border-green-500 transition-all duration-300">
                    <img
                      src={
                        profile?.avatar_url ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.username}`
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-1 right-1 p-2 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera size={16} />
                  </button>
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold">
                    {profile?.full_name || "Member"}
                  </h2>
                  <p className="text-green-500 font-medium opacity-80">
                    @{profile?.username}
                  </p>
                </div>
                <div className="w-full h-px bg-white/10 my-6"></div>
                <button className="w-full py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 font-semibold">
                  <Edit2 size={16} />
                  {t.editProfile}
                </button>
              </div>

              {/* Account Settings Shortcut */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Shield size={20} className="text-green-500" />
                  {t.accountSettings}
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between group">
                    <span className="opacity-70 group-hover:opacity-100">
                      Security
                    </span>
                    <Shield size={16} className="opacity-30" />
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between group">
                    <span className="opacity-70 group-hover:opacity-100">
                      Notifications
                    </span>
                    <Bell size={16} className="opacity-30" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Stats */}
            <div className="md:col-span-2 space-y-8">
              {/* Personal Info */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">
                  {t.personalInfo}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm opacity-50 block uppercase tracking-wider font-semibold">
                      {t.fullName}
                    </label>
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-green-500" />
                      <span className="text-lg">
                        {profile?.full_name || "Not set"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm opacity-50 block uppercase tracking-wider font-semibold">
                      {t.email}
                    </label>
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-green-500" />
                      <span className="text-lg">
                        {profile?.email || "Not set"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm opacity-50 block uppercase tracking-wider font-semibold">
                      {t.phone}
                    </label>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-green-500" />
                      <span className="text-lg">
                        {profile?.phone || "Not set"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm opacity-50 block uppercase tracking-wider font-semibold">
                      User Role
                    </label>
                    <div className="flex items-center gap-3">
                      <Shield size={18} className="text-green-500" />
                      <span className="text-lg capitalize">
                        {profile?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Stats */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">
                  Membership Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="stat-card-green p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <PiggyBank className="text-green-500" size={20} />
                      <span className="text-xs font-bold text-green-500 uppercase">
                        Total
                      </span>
                    </div>
                    <p className="text-2xl font-bold">৳ 15,000</p>
                    <p className="text-xs opacity-50">Total Contributions</p>
                  </div>
                  <div className="stat-card-blue p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <CreditCard className="text-blue-primary" size={20} />
                      <span className="text-xs font-bold text-blue-primary uppercase">
                        Active
                      </span>
                    </div>
                    <p className="text-2xl font-bold">৳ 8,500</p>
                    <p className="text-xs opacity-50">Current Loans</p>
                  </div>
                  <div className="stat-card-purple p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="text-purple-500" size={20} />
                      <span className="text-xs font-bold text-purple-500 uppercase">
                        Savings
                      </span>
                    </div>
                    <p className="text-2xl font-bold">৳ 42,000</p>
                    <p className="text-xs opacity-50">Available Balance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
