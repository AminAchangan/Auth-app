"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.replace("/auth");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Dashboard</h1>

      <div className={styles.userCard}>
        <img
          src={user.picture?.medium || "/default-avatar.png"}
          alt={`${user.name?.first} ${user.name?.last}`}
          className={styles.avatar}
        />
        <div>
          <h2 className={styles.userName}>
            {user.name?.title} {user.name?.first} {user.name?.last}
          </h2>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.location}>
            {user.location?.city}, {user.location?.state}
          </p>
        </div>
      </div>

      <section className={styles.detailsSection}>
        <h3 className={styles.sectionTitle}>Your Details</h3>
        <ul className={styles.detailsList}>
          <li>
            <strong>Gender:</strong> {user.gender}
          </li>
          <li>
            <strong>Phone:</strong> {user.phone}
          </li>
          <li>
            <strong>Cell:</strong> {user.cell}
          </li>
          <li>
            <strong>Date of Birth:</strong>{" "}
            {user.dob?.date
              ? new Date(user.dob.date).toLocaleDateString()
              : "N/A"}
          </li>
          <li>
            <strong>Nationality:</strong> {user.nat}
          </li>
        </ul>
      </section>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
