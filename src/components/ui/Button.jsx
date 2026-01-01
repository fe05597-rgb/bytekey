import { Link } from 'react-router-dom'
import styles from './Button.module.css'

function Button({ children, to, href, variant = 'primary', size = 'md', onClick, type = 'button', disabled }) {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`

  if (to) {
    return <Link to={to} className={className}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
