import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Empower Your Mission.</h1>
          <p className={styles.heroSubtitle}>
            The all-in-one platform for modern non-profits. Manage donors, campaigns, and volunteers with ease.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryBtn}>Get Started</button>
            <button className={styles.secondaryBtn}>View Demo</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
