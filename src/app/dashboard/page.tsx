import Card from "@/components/ui/Card";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Card hover className={styles.statCard}>
          <h3>Total Donations</h3>
          <p className={styles.value}>$124,500</p>
          <span className={styles.trend}>+12% from last month</span>
        </Card>
        <Card hover className={styles.statCard}>
          <h3>Active Volunteers</h3>
          <p className={styles.value}>842</p>
          <span className={styles.trend}>+5% new signups</span>
        </Card>
        <Card hover className={styles.statCard}>
          <h3>Campaigns</h3>
          <p className={styles.value}>12</p>
          <span className={styles.trend}>3 ending soon</span>
        </Card>
      </div>
    </div>
  );
}
