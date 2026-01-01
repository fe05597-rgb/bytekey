import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import Button from '../../components/ui/Button'
import styles from './Home.module.css'

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

function Home() {
  const { t } = useTranslation()

  const services = [
    { key: 'itSolutions' },
    { key: 'tracking' },
    { key: 'monitoring' },
    { key: 'communications' }
  ]

  return (
    <motion.div className={styles.home} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.videoContainer}>
          <video 
            className={styles.videoBackground}
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src={`${import.meta.env.BASE_URL}videos/hero-bg.mp4`} type="video/mp4" />
          </video>
          <div className={styles.videoOverlay}></div>
          <div className={styles.videoFade}></div>
        </div>
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
          <div className={styles.heroCta}>
            <Button to="/services" variant="primary" size="lg">{t('hero.cta')}</Button>
            <Button to="/contact" variant="ghost" size="lg">{t('hero.ctaSecondary')}</Button>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>{t('hero.scroll')}</span>
          <div className={styles.scrollLine}>
            <div className={styles.scrollDot}></div>
          </div>
        </motion.div>
      </section>

      <div className="divider"></div>

      {/* About Section */}
      <AnimatedSection className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutContent}>
            <motion.div className={styles.aboutText} variants={fadeInUp}>
              <span className={styles.sectionLabel}>{t('about.sectionTitle')}</span>
              <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
              <p>{t('about.intro')}</p>
              <Button to="/about" variant="outline">{t('about.readMore')}</Button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <div className="divider"></div>

      {/* Services Preview */}
      <AnimatedSection className={styles.servicesSection}>
        <div className="container">
          <motion.span className={styles.sectionLabel} variants={fadeInUp}>{t('services.sectionTitle')}</motion.span>
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>{t('services.title')}</motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>{t('services.subtitle')}</motion.p>

          <motion.div className={styles.servicesGrid} variants={fadeInUp}>
            {services.map((service, index) => (
              <Link to="/services" key={service.key} className={styles.serviceCard}>
                <span className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.serviceTitle}>{t(`services.items.${service.key}.title`)}</h3>
                <p className={styles.serviceDesc}>{t(`services.items.${service.key}.short`)}</p>
                <span className={styles.serviceLink}>{t('services.learnMore')} →</span>
              </Link>
            ))}
          </motion.div>

          <motion.div className={styles.sectionCta} variants={fadeInUp}>
            <Button to="/services" variant="outline">{t('services.viewAll')}</Button>
          </motion.div>
        </div>
      </AnimatedSection>

      <div className="divider"></div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
            <Button to="/contact" variant="primary" size="lg">{t('cta.button')}</Button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
