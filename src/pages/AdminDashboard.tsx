import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { translations, Language } from "../data/translations";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSelector } from "../components/LanguageSelector";
import {
  User,
  Users,
  LogOut,
  TrendingUp,
  Wallet,
  Search,
  MoreVertical,
  Edit,
} from "lucide-react";
import logo from "../assets/logo.svg";

type UserRecord = {
  id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || "en"
  );

  const t = translations[language];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, email, role, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    totalMembers: users.filter((u) => u.role === "member").length,
    totalInvestors: users.filter((u) => u.role === "investor").length,
    totalAdmins: users.filter((u) => u.role === "admin").length,
    totalUsers: users.length,
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
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">{t.logout}</span>
          </button>
        </div>
      </nav>

      <main className="content-wrapper pt-32 pb-12 px-4">
        <div className="max-w-7xl w-full mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">
                Admin {t.dashboard}
              </h2>
              <p className="text-lg opacity-60">
                Manage users and oversee platform operations.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat-card-blue p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-glow-blue">
                  <Users size={24} className="text-blue-primary" />
                </div>
              </div>
              <div>
                <p className="text-sm opacity-60 font-medium uppercase tracking-wider">
                  Total Users
                </p>
                <h3 className="text-4xl font-bold mt-2">{stats.totalUsers}</h3>
              </div>
            </div>

            <div className="stat-card-green p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-glow-green">
                  <User size={24} className="text-green-500" />
                </div>
              </div>
              <div>
                <p className="text-sm opacity-60 font-medium uppercase tracking-wider">
                  Members
                </p>
                <h3 className="text-4xl font-bold mt-2">
                  {stats.totalMembers}
                </h3>
              </div>
            </div>

            <div className="stat-card-purple p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-glow-purple">
                  <TrendingUp size={24} className="text-purple-500" />
                </div>
              </div>
              <div>
                <p className="text-sm opacity-60 font-medium uppercase tracking-wider">
                  Investors
                </p>
                <h3 className="text-4xl font-bold mt-2">
                  {stats.totalInvestors}
                </h3>
              </div>
            </div>

            <div className="glass-card-elevated p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                  <Wallet size={24} className="text-orange-500" />
                </div>
              </div>
              <div>
                <p className="text-sm opacity-60 font-medium uppercase tracking-wider">
                  Admins
                </p>
                <h3 className="text-4xl font-bold mt-2">{stats.totalAdmins}</h3>
              </div>
            </div>
          </div>

          {/* User Management Table */}
          <div className="glass-card p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <h3 className="text-2xl font-bold">User Management</h3>

              <div className="flex gap-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-primary focus:outline-none focus:ring-2 focus:ring-blue-primary/20 transition-all min-w-[250px]"
                  />
                </div>

                {/* Role Filter */}
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-primary focus:outline-none focus:ring-2 focus:ring-blue-primary/20 transition-all cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="member">Members</option>
                  <option value="investor">Investors</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-primary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-sm font-bold opacity-60 uppercase tracking-wider">
                        User
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-bold opacity-60 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-bold opacity-60 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-bold opacity-60 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-bold opacity-60 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-all group"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-primary/20 border border-blue-primary/30">
                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                                alt={user.username}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold">
                                {user.full_name || user.username}
                              </p>
                              <p className="text-sm opacity-50">
                                @{user.username}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 opacity-70">
                          {user.email || "N/A"}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold uppercase
                              ${
                                user.role === "admin"
                                  ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                                  : ""
                              }
                              ${
                                user.role === "investor"
                                  ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                                  : ""
                              }
                              ${
                                user.role === "member"
                                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                  : ""
                              }
                            `}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 opacity-70 text-sm">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-blue-primary/10 text-blue-primary transition-all">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/5 opacity-50 hover:opacity-100 transition-all">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12 opacity-50">
                    <p>No users found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
