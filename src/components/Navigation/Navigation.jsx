import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import styles from './Navigation.module.css'

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'contact', path: '/contact' }
]

function Navigation({ onClose }) {
  const { t } = useTranslation()

  return (
    <motion.nav
      className={styles.navigation}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.background}>
        <div className={styles.gradientOrb}></div>
      </div>
      
      <div className={styles.content}>
        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            >
              <Link to={item.path} className={styles.navLink} onClick={onClose}>
                <span className={styles.navText}>{t(`nav.${item.key}`)}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}

export default Navigation
