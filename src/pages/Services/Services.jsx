import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Services.module.css'

function Services() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const containerRef = useRef(null)
  const lastScrollTime = useRef(0)
  const touchStartY = useRef(0)
  const autoPlayTimer = useRef(null)
  const scrollCooldown = 1200
  const autoPlayInterval = 6000

  const services = [
    { key: 'itSolutions' },
    { key: 'tracking' },
    { key: 'monitoring' },
    { key: 'communications' },
    { key: 'security' },
    { key: 'support' }
  ]

  const totalSlides = services.length + 1

  useEffect(() => {
    if (!isAutoPlay || isAnimating) return
    autoPlayTimer.current = setInterval(() => {
      setDirection(1)
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
      lastScrollTime.current = Date.now()
    }, autoPlayInterval)
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current)
    }
  }, [isAutoPlay, isAnimating, totalSlides])

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlay(false)
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current)
    setTimeout(() => setIsAutoPlay(true), 15000)
  }, [])

  const goToSlide = useCallback((index, fromUser = true) => {
    const now = Date.now()
    if (now - lastScrollTime.current < scrollCooldown) return
    if (isAnimating || index === currentIndex) return
    if (index < 0 || index >= totalSlides) return
    if (fromUser) pauseAutoPlay()
    lastScrollTime.current = now
    setDirection(index > currentIndex ? 1 : -1)
    setIsAnimating(true)
    setCurrentIndex(index)
  }, [currentIndex, isAnimating, totalSlides, pauseAutoPlay])

  const goNext = useCallback(() => {
    pauseAutoPlay()
    goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0, false)
  }, [currentIndex, totalSlides, goToSlide, pauseAutoPlay])

  const goPrev = useCallback(() => {
    pauseAutoPlay()
    goToSlide(currentIndex > 0 ? currentIndex - 1 : totalSlides - 1, false)
  }, [currentIndex, totalSlides, goToSlide, pauseAutoPlay])

  useEffect(() => {
    let accumulatedDelta = 0
    let scrollTimeout = null
    const threshold = 80

    const handleWheel = (e) => {
      e.preventDefault()
      pauseAutoPlay()
      const now = Date.now()
      if (now - lastScrollTime.current < scrollCooldown || isAnimating) return
      accumulatedDelta += e.deltaY
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => { accumulatedDelta = 0 }, 150)
      if (accumulatedDelta > threshold) { accumulatedDelta = 0; goNext() }
      else if (accumulatedDelta < -threshold) { accumulatedDelta = 0; goPrev() }
    }

    const container = containerRef.current
    if (container) container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      if (container) container.removeEventListener('wheel', handleWheel)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [isAnimating, goNext, goPrev, pauseAutoPlay])

  useEffect(() => {
    const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; pauseAutoPlay() }
    const handleTouchEnd = (e) => {
      const now = Date.now()
      if (now - lastScrollTime.current < scrollCooldown || isAnimating) return
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (diff > 80) goNext()
      else if (diff < -80) goPrev()
    }
    const container = containerRef.current
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
    }
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isAnimating, goNext, goPrev, pauseAutoPlay])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const handleAnimationComplete = () => setIsAnimating(false)

  const slideVariants = {
    enter: (direction) => ({ y: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (direction) => ({ y: direction < 0 ? '100%' : '-100%', opacity: 0 })
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }
    })
  }

  return (
    <div className={styles.servicesWrapper}>
      <div className={styles.videoContainer}>
        <video 
          className={styles.videoBackground}
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={`${import.meta.env.BASE_URL}videos/1hero-bg.mp4`} type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}></div>
        <div className={styles.videoFade}></div>
      </div>

      <div className={styles.services} ref={containerRef}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {currentIndex === 0 ? (
            <motion.section
              key="hero"
              className={styles.hero}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              onAnimationComplete={handleAnimationComplete}
            >
              <div className={styles.heroContent}>
                <motion.span className={styles.heroLabel} custom={0} variants={contentVariants} initial="hidden" animate="visible">
                  {t('services.sectionTitle')}
                </motion.span>
                <motion.h1 className={styles.heroTitle} custom={1} variants={contentVariants} initial="hidden" animate="visible">
                  {t('services.title')}
                </motion.h1>
                <motion.p className={styles.heroSubtitle} custom={2} variants={contentVariants} initial="hidden" animate="visible">
                  {t('services.subtitle')}
                </motion.p>
              </div>
              <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <span>{t('services.scrollToExplore')}</span>
                <div className={styles.scrollLine}><div className={styles.scrollDot}></div></div>
              </motion.div>
            </motion.section>
          ) : (
            <motion.section
              key={services[currentIndex - 1].key}
              className={styles.serviceSection}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              onAnimationComplete={handleAnimationComplete}
            >
              <div className={styles.sectionContent}>
                <div className={styles.serviceInfo}>
                  <motion.h2 className={styles.serviceTitle} custom={0} variants={contentVariants} initial="hidden" animate="visible">
                    {t(`services.items.${services[currentIndex - 1].key}.title`)}
                  </motion.h2>
                  <motion.p className={styles.serviceDescription} custom={1} variants={contentVariants} initial="hidden" animate="visible">
                    {t(`services.items.${services[currentIndex - 1].key}.description`)}
                  </motion.p>
                  <motion.div className={styles.serviceFeatures} custom={2} variants={contentVariants} initial="hidden" animate="visible">
                    {t(`services.items.${services[currentIndex - 1].key}.features`, { returnObjects: true }).map((feature, i) => (
                      <span key={i} className={styles.featureTag}>{feature}</span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <div className={styles.progressBar}>
          <motion.div className={styles.progressFill} initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>

        <nav className={styles.sideNav}>
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${currentIndex === index ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            >
              {index > 0 && <span className={styles.navTooltip}>{t(`services.items.${services[index - 1].key}.title`)}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.navArrows}>
          <button className={styles.navArrow} onClick={goPrev} disabled={isAnimating}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
          </button>
          <button className={styles.navArrow} onClick={goNext} disabled={isAnimating}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services
