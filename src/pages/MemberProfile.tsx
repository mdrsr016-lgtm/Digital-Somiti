import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Wallet,
  CreditCard,
  Settings,
  Bell,
  ChevronDown,
  Camera,
  Upload,
  FileText,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.svg";
import "./MemberProfile.css";

export const MemberProfile = () => {
  const navigate = useNavigate();
  // Mock data matching the design
  const user = {
    name: "User name",
    email: "mi@xpaytech.co",
    phone: "+20-01274318900",
    address: "285 N Broad St, Elizabeth, NJ 07208, USA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  };

  const SidebarItem = ({
    icon: Icon,
    active = false,
  }: {
    icon: any;
    active?: boolean;
  }) => (
    <div className={`sidebar-item ${active ? "active" : ""}`}>
      <Icon size={24} />
      {active && <div className="active-indicator" />}
    </div>
  );

  return (
    <div className="member-profile-page">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="sidebar-logo">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10"
            style={{ width: 40, height: 40 }}
          />
        </div>

        <nav className="sidebar-nav">
          <div
            onClick={() => navigate("/member")}
            style={{
              width: "100%",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            <SidebarItem icon={Home} />
          </div>
          <div
            style={{
              width: "100%",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            <SidebarItem icon={User} active />
          </div>
          <div
            style={{
              width: "100%",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            <SidebarItem icon={FileText} />
          </div>
          <div
            style={{
              width: "100%",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            <SidebarItem icon={Wallet} />
          </div>
          <div
            style={{
              width: "100%",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            <SidebarItem icon={CreditCard} />
          </div>
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={() => navigate("/")}
            className="header-btn"
            style={{ padding: "1rem" }}
          >
            <LogOut size={24} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="profile-main">
        {/* Top Header */}
        <header className="profile-header">
          <div style={{ width: 40 }}></div> {/* Spacer */}
          <div className="header-actions">
            <button className="header-btn">
              <Settings size={20} />
            </button>
            <div className="notification-wrapper">
              <button className="header-btn">
                <Bell size={20} />
              </button>
              <span className="notification-dot"></span>
            </div>

            <div className="user-menu">
              <span className="user-name">User name</span>
              <ChevronDown size={16} color="#9ca3af" />
              <img
                src={user.avatar}
                alt="Profile"
                className="user-avatar-small"
              />
            </div>
          </div>
        </header>

        {/* Page Title */}
        <div className="page-title-wrapper">
          <div className="title-dot"></div>
          <h1 className="page-title">Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-grid">
            {/* Left Column: Avatar & Actions */}
            <div className="profile-left">
              {/* Avatar Container */}
              <div className="avatar-container">
                <button className="camera-btn">
                  <Camera size={20} />
                </button>
                <img
                  src="https://illustrations.popsy.co/amber/survey.svg"
                  alt="Avatar Illustration"
                  className="avatar-img"
                />
              </div>

              {/* Action Buttons */}
              <div className="actions-grid">
                <div className="action-box">
                  <span className="action-label">Logo</span>
                </div>
                <div className="action-box">
                  <Upload size={20} />
                  <span className="action-label">
                    Vendor
                    <br />
                    Documents
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: User Details */}
            <div className="profile-right">
              <div className="details-stack">
                <div className="detail-item">
                  <label>Name:</label>
                  <p>{user.name}</p>
                </div>

                <div className="detail-item">
                  <label>Email:</label>
                  <p>{user.email}</p>
                </div>

                <div className="detail-item">
                  <label>Phone Number:</label>
                  <p>{user.phone}</p>
                </div>

                <div className="detail-item">
                  <label>Address:</label>
                  <p style={{ maxWidth: "80%", lineHeight: 1.6 }}>
                    {user.address}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <button className="edit-btn">
                  <span>✎</span> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
