'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import styles from './dashboard.module.scss'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [loadingRedirect, setLoadingRedirect] = useState(false)

  useEffect(() => {
    if (!user) {
      setLoadingRedirect(true)
      router.replace('/auth')
    }
  }, [user, router])

  const handleLogout = useCallback(() => {
    logout()
    router.replace('/auth')
  }, [logout, router])

  if (loadingRedirect) {
    return <p>Redirecting to login...</p>
  }

  if (!user) return null

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Dashboard</h1>

      <div className={styles.userCard}>
        <Image
          src={user.picture?.medium || '/default-avatar.png'}
          alt={`${user.name?.first ?? ''} ${user.name?.last ?? ''}`}
          width={100}
          height={100}
          className={styles.avatar}
        />
        <div>
          <h2 className={styles.userName}>
            {user.name?.title ?? ''} {user.name?.first ?? ''}{' '}
            {user.name?.last ?? ''}
          </h2>
          <p className={styles.email}>{user.email ?? 'No email provided'}</p>
          <p className={styles.location}>
            {user.location?.city ?? 'Unknown'}, {user.location?.state ?? ''}
          </p>
        </div>
      </div>

      <section className={styles.detailsSection}>
        <h3 className={styles.sectionTitle}>Your Details</h3>
        <ul className={styles.detailsList}>
          <li>
            <strong>Gender:</strong> {user.gender ?? 'N/A'}
          </li>
          <li>
            <strong>Phone:</strong> {user.phone ?? 'N/A'}
          </li>
          <li>
            <strong>Cell:</strong> {user.cell ?? 'N/A'}
          </li>
          <li>
            <strong>Date of Birth:</strong>{' '}
            {user.dob?.date
              ? new Date(user.dob.date).toLocaleDateString()
              : 'N/A'}
          </li>
          <li>
            <strong>Nationality:</strong> {user.nat ?? 'N/A'}
          </li>
        </ul>
      </section>

      <button
        className={styles.logoutBtn}
        onClick={handleLogout}
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  )
}
