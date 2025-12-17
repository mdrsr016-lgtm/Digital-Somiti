"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import styles from "../page.module.css";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className={styles.pricingBox} style={{ maxWidth: '400px', padding: '3rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Welcome Back</h1>
          <p style={{ marginBottom: '2rem' }}>Please enter your credentials to access the dashboard.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
             <input type="text" placeholder="Email or Username" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
             <input type="password" placeholder="Password" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
             <Button variant="primary" size="lg" style={{ width: '100%' }}>Login</Button>
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>&larr; Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
