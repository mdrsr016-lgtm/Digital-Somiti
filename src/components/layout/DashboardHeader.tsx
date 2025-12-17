import styles from "./DashboardHeader.module.css";
import Button from "../ui/Button";

export default function DashboardHeader({ title = "Dashboard" }: { title?: string }) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.actions}>
         <Button variant="ghost" size="sm">Help</Button>
         <Button variant="ghost" size="sm">Notifications</Button>
      </div>
    </header>
  );
}
