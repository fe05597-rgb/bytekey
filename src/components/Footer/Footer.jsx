import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoWrapper}>
              <img src={`${import.meta.env.BASE_URL}images/logo-footer.png`} alt="ByteKey" className={styles.logo} />
            </div>
            <p className={styles.description}>{t('footer.description')}</p>
            <div className={styles.registration}>
              <span>{t('footer.info.crn')}: 1234567890</span>
              <span>{t('footer.info.trn')}: 301234567890003</span>
            </div>
          </div>

          <div className={styles.links}>
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/services">{t('nav.services')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>{t('footer.services')}</h4>
            <ul>
              <li><Link to="/services">{t('services.items.itSolutions.title')}</Link></li>
              <li><Link to="/services">{t('services.items.tracking.title')}</Link></li>
              <li><Link to="/services">{t('services.items.monitoring.title')}</Link></li>
              <li><Link to="/services">{t('services.items.communications.title')}</Link></li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>{t('footer.contactUs')}</h4>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{t('contact.info.address.value')}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
                </svg>
                <span dir="ltr">+966 XX XXX XXXX</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@bytekey.sa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} ByteKey. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
