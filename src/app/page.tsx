import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            {t.hero.titlePrefix} <span className={styles.highlight}>{t.hero.highlight}</span> {t.hero.titleSuffix}
          </h1>
          <p className={styles.heroSubtitle}>
            {t.hero.subtitle}
          </p>
          
          <div className={styles.heroActions}>
            <Link href="/dashboard" className={styles.primaryBtn}>{t.hero.ctaPrimary}</Link>
            <Link href="#features" className={styles.secondaryBtn}>{t.hero.ctaSecondary}</Link>
          </div>

          <div className={styles.trustSection}>
            <p className={styles.trustLabel}>{t.hero.trustLabel}</p>
            <div className={styles.trustLogos}>
                <span>XYZ Org</span>
                <span>Astha Foundation</span>
                <span>Bandhan</span>
                <span>Oggrotii</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2>{t.features.title}</h2>
                <p>{t.features.subtitle}</p>
            </div>
            
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L15 11h4a2 2 0 012 2v2a2 2 0 01-2 2h-4l-1.408 1.408A2.001 2.001 0 0012 21a2.001 2.001 0 00-1.408.592L9 17H5a2 2 0 01-2-2v-2a2 2 0 012-2h4l1.592-1.408A2.001 2.001 0 0012 8z"></path></svg>
                    </div>
                    <h3>{t.features.card1.title}</h3>
                    <p>{t.features.card1.desc}</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3>{t.features.card2.title}</h3>
                    <p>{t.features.card2.desc}</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                    </div>
                    <h3>{t.features.card3.title}</h3>
                    <p>{t.features.card3.desc}</p>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={styles.sectionAlt}>
             <div className={`${styles.sectionHeader} ${styles.narrow}`}>
                <h2>{t.faq.title}</h2>
            </div>
            <div className={styles.faqList}>
                {t.faq.items.map((item, index) => (
                    <div key={index} className={styles.faqItem}>
                        <button 
                          className={styles.faqButton}
                          onClick={() => toggleAccordion(index)}
                        >
                            <span>{item.q}</span>
                            <svg 
                              className={`${styles.chevron} ${activeAccordion === index ? styles.rotate : ''}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div 
                          className={`${styles.faqContent} ${activeAccordion === index ? styles.expanded : ''}`}
                        >
                            <p>{item.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        {/* Pricing CTA */}
        <section id="pricing" className={styles.section}>
             <div className={styles.pricingBox}>
                <h3>{t.pricing.title}</h3>
                <p>{t.pricing.subtitle}</p>
                <Link href="/contact" className={styles.ctaBtn}>{t.pricing.cta}</Link>
             </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
