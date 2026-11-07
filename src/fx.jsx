import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

/** Headline that rises word by word from behind a mask when it enters the screen. */
export function Lines({ children, as: Tag = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const text = String(children)
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[.14em] -mb-[.14em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '115%' }}
              animate={seen ? { y: 0 } : {}}
              transition={{ duration: 0.95, ease, delay: delay + i * 0.05 }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}

/** Paragraph whose words light up as you scroll through it. */
export function TextReveal({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={'relative ' + className}>
      {words.map((w, i) => (
        <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} />
      ))}
    </p>
  )
}
function Word({ w, p, a, b }) {
  const o = useTransform(p, [a, b], [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity: o }}>{w}</motion.span>{' '}
    </>
  )
}

/** Pulls its child gently towards the cursor. */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })
  return (
    <motion.div
      ref={ref}
      className={'inline-block ' + className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/** Image that slides up behind a wipe the first time it is seen. */
export function Wipe({ children, className = '' }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={seen ? { clipPath: 'inset(0 0 0% 0)' } : {}}
        transition={{ duration: 1.2, ease }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Image that drifts slightly slower than the page. */
export function ParallaxImg({ src, alt, className = '', amount = 36 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount])
  return (
    <div ref={ref} className={'relative overflow-hidden ' + className}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.18 }} className="h-full w-full object-cover" />
    </div>
  )
}

/** Endless horizontal drift; stops on hover or when paused. */
export function Marquee({ children, reverse = false, paused = false, speed = 60 }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex w-max gap-6 animate-marquee"
        style={{
          animationDuration: speed + 's',
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: paused || hover ? 'paused' : 'running',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

/** Sparks rising from the lamps. Skipped for people who prefer reduced motion. */
export function Embers({ className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = ref.current
    const x = c.getContext('2d')
    let W, H, raf
    const P = Array.from({ length: 38 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.5, s: Math.random() * 0.0007 + 0.0002, d: Math.random() * 6 }))
    const size = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight }
    size()
    addEventListener('resize', size)
    const tick = () => {
      x.clearRect(0, 0, W, H)
      P.forEach((p) => {
        p.y -= p.s * H / 600
        p.d += 0.012
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random() }
        x.beginPath()
        x.arc(p.x * W + Math.sin(p.d) * 14, p.y * H, p.r, 0, 7)
        x.fillStyle = `rgba(255,190,110,${0.3 + p.r / 4})`
        x.shadowBlur = 10
        x.shadowColor = '#ffae52'
        x.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className={'pointer-events-none absolute inset-0 h-full w-full ' + className} />
}
