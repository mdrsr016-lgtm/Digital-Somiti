"use client";

import styles from "./Sidebar.module.css";
import Logo from "../ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Overview", href: "/dashboard", icon: "grid" },
  { label: "Donors", href: "/dashboard/donors", icon: "users" },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: "heart" },
  { label: "Reports", href: "/dashboard/reports", icon: "bar-chart" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Logo href="/dashboard" />
      </div>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
            >
              <span className={styles.iconBox}></span> {/* Placeholder for icon */}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>AS</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Aeysha S.</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
