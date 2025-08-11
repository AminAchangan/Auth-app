import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, type = 'button', ...props }, ref) => {
  return (
    <button ref={ref} type={type} className={styles.button} {...props}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
