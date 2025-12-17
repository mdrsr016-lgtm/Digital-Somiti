import styles from "./Navbar.module.css";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.actions}>
          <Link href="/features" className={styles.link}>Features</Link>
          <Link href="/pricing" className={styles.link}>Pricing</Link>
          <Link href="/dashboard">
             <Button variant="primary" size="sm">Dashboard Demo</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
