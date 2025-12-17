import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className={styles.logo}>
      <div className={styles.icon}>
        <div className={styles.circle}></div>
        <div className={styles.square}></div>
      </div>
      <span className={styles.text}>NGO Cloud</span>
    </Link>
  );
}
