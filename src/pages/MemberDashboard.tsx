import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Wallet,
  CreditCard,
  FileText,
  LogOut,
  ChevronDown,
  ExternalLink,
  Copy,
  MessageSquare,
  Settings,
} from "lucide-react";
import logo from "../assets/logo.svg";
import "./MemberDashboard.css";

export const MemberDashboard = () => {
  const navigate = useNavigate();

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
    <div className="member-dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
        </div>

        <nav className="sidebar-nav">
          <div onClick={() => navigate("/member")}>
            <SidebarItem icon={Home} active />
          </div>
          <div onClick={() => navigate("/member/profile")}>
            <SidebarItem icon={User} />
          </div>
          <SidebarItem icon={FileText} />
          <SidebarItem icon={Wallet} />
          <SidebarItem icon={CreditCard} />
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-item">
            <Settings size={22} color="#1e293b" />
          </div>
          <button
            onClick={() => navigate("/")}
            className="sidebar-item"
            style={{ border: "none" }}
          >
            <LogOut size={22} color="#1e293b" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-title-group">
            <h1>Last sales</h1>
            <p>Keep track of your nft and collections</p>
          </div>
          <button className="filter-btn">
            Expensive - Cheap
            <ChevronDown size={16} />
          </button>
        </header>

        {/* Asset Card */}
        <div className="asset-card">
          {/* Left: Info */}
          <div className="asset-info">
            <div className="creator-info">
              <div className="creator-icon">|||</div>
              <div className="creator-details">
                <h3>HAPE #4081</h3>
                <span>By Hape Prime</span>
              </div>
            </div>

            <div className="price-section">
              <div className="price-block">
                <h2>300.06 SOL</h2>
                <span>Sold for</span>
                <span className="time-ago">25 min ago</span>
              </div>
              <div className="transaction-block">
                <h4>srHs ... 9Lsg</h4>
                <span>Transaction ID</span>
                <div className="btn-group">
                  <button className="primary-btn">
                    <ExternalLink size={14} /> Check TxID
                  </button>
                  <button className="secondary-btn">
                    <Copy size={14} /> Copy
                  </button>
                </div>
              </div>
            </div>

            <div className="attributes-section">
              <h4>Attributes</h4>
              <div className="attributes-grid">
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Birthday</span>
                    <span>1.6%</span>
                  </div>
                  <span className="attr-value">29.12</span>
                </div>
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Clothing</span>
                    <span>3.2%</span>
                  </div>
                  <span className="attr-value">Banana H.</span>
                </div>
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Eyes</span>
                    <span>5%</span>
                  </div>
                  <span className="attr-value">Bubble Gum</span>
                </div>
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Fur</span>
                    <span>9.1%</span>
                  </div>
                  <span className="attr-value">White</span>
                </div>
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Haircut</span>
                    <span>4.9%</span>
                  </div>
                  <span className="attr-value">Braids</span>
                </div>
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Head</span>
                    <span>5.2%</span>
                  </div>
                  <span className="attr-value">Bullish</span>
                </div>
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Headwear</span>
                    <span>1.4%</span>
                  </div>
                  <span className="attr-value">Bermuda</span>
                </div>
                <div className="attribute-pill">
                  <div className="attr-header">
                    <span>Tattoos</span>
                    <span>6%</span>
                  </div>
                  <span className="attr-value">Anarchy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="asset-preview">
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-monkey-with-sunglasses_23-2149414197.jpg?w=1380&t=st=1708535000~exp=1708535600~hmac=example"
              alt="HAPE #4081"
              className="asset-img"
              // Fallback image usage
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://img.freepik.com/free-photo/cool-monkey-wearing-stylish-clothes_23-2150912170.jpg";
              }}
            />
          </div>
        </div>

        {/* Bottom Feed Cards */}
        <div className="bottom-feed">
          <div className="feed-card">
            <div className="feed-header">
              <span className="feed-meta">12 days ago</span>
              <div className="discord-tag">
                <MessageSquare size={12} /> Discord
              </div>
            </div>
            <div className="feed-content">
              <h3>DreamOS Testing now!</h3>
              <p>
                Make iPhone your own with all-new ways to personalize your Lock
                Screen. Showcase favorite photos, customize font styles, and
                display a set of widgets to get information at a glance.
              </p>
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-header">
              <span className="feed-meta">15 days ago</span>
              <div className="discord-tag">
                <MessageSquare size={12} /> Discord
              </div>
            </div>
            <div className="feed-content">
              <h3>Personal is powerful</h3>
              <p>
                You can now create different Lock Screens, each with a unique
                backdrop and style, and easily switch between them. Browse a
                gallery of wallpapers with suggested photos and themed
                collections for inspiration.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
