import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <DashboardHeader />
        <main className={styles.scrollArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
