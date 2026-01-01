import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import Button from '../../components/ui/Button'
import styles from './About.module.css'

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

function About() {
  const { t } = useTranslation()

  const values = ['innovation', 'reliability', 'excellence', 'partnership']

  return (
    <motion.div className={styles.about} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb}></div>
        </div>
        <div className={styles.heroContent}>
          <span className={styles.pageLabel}>{t('about.sectionTitle')}</span>
          <h1>{t('about.title')}</h1>
        </div>
      </section>

      <div className="divider"></div>

      {/* Intro */}
      <AnimatedSection className={styles.introSection}>
        <div className="container">
          <motion.div className={styles.introContent} variants={fadeInUp}>
            <p className={styles.introPara}>{t('about.intro')}</p>
          </motion.div>
        </div>
      </AnimatedSection>

      <div className="divider"></div>

      {/* Mission & Vision */}
      <AnimatedSection className={styles.missionSection}>
        <div className="container">
          <motion.div className={styles.missionGrid} variants={fadeInUp}>
            <div className={styles.missionCard}>
              <span className={styles.cardNumber}>01</span>
              <h3>{t('about.mission.title')}</h3>
              <p>{t('about.mission.description')}</p>
            </div>
            <div className={styles.missionCard}>
              <span className={styles.cardNumber}>02</span>
              <h3>{t('about.vision.title')}</h3>
              <p>{t('about.vision.description')}</p>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <div className="divider"></div>

      {/* Values */}
      <AnimatedSection className={styles.valuesSection}>
        <div className="container">
          <motion.span className={styles.sectionLabel} variants={fadeInUp}>{t('about.values.sectionTitle')}</motion.span>
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>{t('about.values.title')}</motion.h2>
          
          <motion.div className={styles.valuesGrid} variants={fadeInUp}>
            {values.map((value, index) => (
              <div key={value} className={styles.valueCard}>
                <span className={styles.valueNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h4>{t(`about.values.items.${value}.title`)}</h4>
                <p>{t(`about.values.items.${value}.description`)}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <div className="divider"></div>

      {/* CTA */}
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

export default About
