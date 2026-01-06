import {
  Activity,
  ArrowRightLeft,
  HandCoins,
  User,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = "status" | "transactions" | "loan" | "profile" | "settings";

export const BottomNav = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<NavItem>("status");

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item);
    if (item === "status") navigate("/member");
  };

  const navItems = [
    { id: "status", label: "Status", icon: Activity },
    { id: "transactions", label: "Transactions", icon: ArrowRightLeft },
    { id: "loan", label: "Take Loan", icon: HandCoins },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="bottom-nav-container">
      <div className="nav-pill">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handleNavClick(item.id as NavItem)}
              style={{ position: "relative" }}
            >
              {/* Active Background Pill - Animated Layout */}
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="active-pill-bg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon and Text Container */}
              <div className="nav-content">
                <item.icon className="nav-icon" />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className="nav-text"
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
