"use client";

import styles from "./Footer.module.css";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Company Info */}
        <div className={styles.column}>
            <h3 className={styles.brand}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                {t.navbar.brand}
            </h3>
            <p className={styles.text}>{t.footer.tagline}</p>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
            <h4>{t.footer.quickLinks}</h4>
            <ul>
                <li><Link href="#features">{t.navbar.features}</Link></li>
                <li><Link href="#pricing">{t.navbar.pricing}</Link></li>
                <li><Link href="#faq">{t.navbar.faq}</Link></li>
            </ul>
        </div>

        {/* Legal */}
        <div className={styles.column}>
            <h4>{t.footer.legal}</h4>
            <ul>
                <li><Link href="#">{t.footer.privacy}</Link></li>
                <li><Link href="#">{t.footer.terms}</Link></li>
            </ul>
        </div>
        
        {/* Contact */}
        <div className={styles.column}>
            <h4>{t.footer.contact}</h4>
            <p className={styles.text}>
                {t.footer.address}
            </p>
        </div>
      </div>
      
      <div className={styles.copyright}>
         &copy; {new Date().getFullYear()} {t.footer.copyright}
      </div>
    </footer>
  );
}
