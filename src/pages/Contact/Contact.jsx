import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import styles from './Contact.module.css'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

function AnimatedSection({ children, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.section ref={ref} className={className} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
      {children}
    </motion.section>
  )
}

function Contact() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    { key: 'address', icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' },
    { key: 'phone', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72' },
    { key: 'email', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
    { key: 'hours', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2' }
  ]

  return (
    <motion.div className={styles.contact} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb}></div>
        </div>
        <div className={styles.heroContent}>
          <span className={styles.pageLabel}>{t('contact.sectionTitle')}</span>
          <h1>{t('contact.title')}</h1>
          <p className={styles.heroSubtitle}>{t('contact.subtitle')}</p>
        </div>
      </section>

      <div className="divider"></div>

      {/* Contact Section */}
      <AnimatedSection className={styles.contactSection}>
        <div className="container">
          <motion.div className={styles.contactGrid} variants={fadeInUp}>
            {/* Form */}
            <div className={styles.formWrapper}>
              <h2>{t('contact.form.title')}</h2>
              
              {submitted ? (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>✓</span>
                  <p>{t('contact.form.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">{t('contact.form.name')}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">{t('contact.form.email')}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="company">{t('contact.form.company')}</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">{t('contact.form.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formState.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className={styles.submitBtn}>
                    {t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className={styles.infoWrapper}>
              <h2>{t('contact.info.title')}</h2>
              <p className={styles.infoDescription}>{t('contact.info.description')}</p>
              
              <div className={styles.infoList}>
                {contactInfo.map((item) => (
                  <div key={item.key} className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <h4>{t(`contact.info.${item.key}.label`)}</h4>
                      <p>{t(`contact.info.${item.key}.value`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </motion.div>
  )
}

export default Contact
