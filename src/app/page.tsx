import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>NGO Cloud</div>
        <nav className={styles.nav}>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#" className={styles.loginBtn}>Login</a>
        </nav>
      </header>
      
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
    </div>
  );
}
