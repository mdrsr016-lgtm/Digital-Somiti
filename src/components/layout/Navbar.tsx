import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check local storage or preference on mount
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <span className={styles.brandName}>সমবায় সাথী</span>
        </div>
        
        <div className={styles.links}>
            <a href="#features">সুবিধাসমূহ</a>
            <a href="#pricing">মূল্য পরিকল্পনা</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">যোগাযোগ</a>
        </div>

        <div className={styles.actions}>
          <div className={styles.langSwitch}>
            <button className={`${styles.langBtn} ${styles.active}`}>BN</button>
            <button className={styles.langBtn}>EN</button>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
               <svg className={styles.themeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            ) : (
               <svg className={styles.themeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            )}
          </button>

          <a href="#" className={styles.loginLink}>লগইন</a>
          <a href="#" className={styles.demoBtn}>বিনামূল্যে ডেমো</a>
        </div>
      </div>
    </nav>
  );
}
