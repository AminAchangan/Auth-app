'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { phoneSchema } from '@/utils/validation'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/ui/Loader/Loader'
import styles from './AuthPage.module.scss'
import z from 'zod'

function validatePhone(phone: string) {
  const cleanedPhone = phone.trim()
  const result = phoneSchema.safeParse({ phone: cleanedPhone })

  if (!result.success) {
    const formattedErrors = z.treeifyError(result.error)
    const firstError =
      formattedErrors.properties?.phone?.errors?.[0] ?? 'input error'
    return firstError
  }
  return null
}

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [phone, setPhone] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleLogin = useCallback(async () => {
    const validationError = validatePhone(phone)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us')
      const data = await res.json()

      login(data.results[0])
      router.push('/dashboard')
    } catch (e) {
      if (e instanceof Error) setError(e.message)
      else setError('Login error')
    } finally {
      setLoading(false)
    }
  }, [phone, login, router])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <Input
        type="text"
        placeholder="phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className={styles.buttonWrapper}>
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? <Loader /> : 'Login'}
        </Button>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </div>
    </div>
  )
}
