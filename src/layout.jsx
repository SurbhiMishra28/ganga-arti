import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { logo } from './media.js'
import { C, NAV, SHLOKA, services } from './data.js'
import { Lines, ParallaxImg, ease } from './fx.jsx'

const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)
export const icons = {
  insta: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" /></>,
  wa: <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19z" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
}
export { Icon }

export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const menuRef = useRef(null)
  const closeButtonRef = useRef(null)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 50)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }
    const handleInstalled = () => setInstallPrompt(null)
    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    if (open) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !open) return

      const focusable = menuRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (open && previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus()
      }
    }
  }, [open])

  const installApp = async () => {
    if (!installPrompt) return
    try {
      await installPrompt.prompt()
      await installPrompt.userChoice
      setInstallPrompt(null)
    } catch (error) {
      console.error('Unable to install the app:', error)
    }
  }

  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-marigold" />
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-paper/95 text-ink shadow-[0_1px_0_rgba(16,28,38,.1)] backdrop-blur' : 'text-white'}`}>
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-3 py-1.5 md:px-6 md:py-2">
          <Link to="/" aria-label="Ganga Arti Wedding Event, home" className="relative z-10 mr-auto shrink-0 rounded-md md:mr-0 md:rounded-full md:border md:border-marigold/50 md:bg-paper/10 md:p-1 md:shadow-[0_0_0_1px_rgba(217,154,6,0.25)] md:backdrop-blur-sm">
            <img src={logo} alt="Ganga Arti Wedding Event" className={`block object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-all duration-500 md:rounded-full md:object-cover ${solid ? 'h-12 w-12 md:h-14 md:w-14' : 'h-14 w-14 md:h-[80px] md:w-[80px]'}`} />
          </Link>
          <nav className="ml-auto hidden items-center gap-9 lg:flex" aria-label="Main">
            {NAV.map((n) =>
              n.cta ? (
                <NavLink key={n.to} to={n.to} className="bg-sindoor px-7 py-3 text-[15px] font-bold tracking-wide text-white shadow-lg shadow-sindoor/30 transition-colors duration-300 hover:bg-ink">
                  {n.label}
                </NavLink>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    `relative py-2 text-[15px] tracking-wide after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-500 ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`
                  }
                >
                  {n.label}
                </NavLink>
              )
            )}
          </nav>
          {installPrompt && (
            <button type="button" onClick={installApp} className="hidden rounded-full border border-current/30 px-4 py-2 text-sm font-semibold transition-colors hover:bg-marigold hover:text-ink lg:inline-flex">
              Install app
            </button>
          )}
          <button
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-marigold focus:ring-offset-2 lg:hidden ${solid ? 'border-ink/15 bg-paper text-ink' : 'border-white/30 bg-ink/25 text-white backdrop-blur-sm'}`}
              aria-label={open ? 'Menu open' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] overflow-auto bg-ink px-8 pb-10 pt-24 text-white"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease }}
          >
            <button
                ref={closeButtonRef}
                className="absolute right-5 top-5 p-2 text-3xl leading-none focus:outline-none focus:ring-2 focus:ring-marigold focus:ring-offset-2 rounded-md transition-colors duration-300"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >✕</button>
            <ul>
              {NAV.filter((n) => !n.cta).map((n, i) => (
                <motion.li key={n.to} className="border-b border-white/15" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease }}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `block py-4 font-display text-3xl ${isActive ? 'text-flame' : ''}`}>{n.label}</NavLink>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Link to="/book" className="mt-8 block bg-sindoor py-5 text-center text-base font-bold tracking-wider text-white">Book Aarti</Link>
              {installPrompt && (
                <button type="button" onClick={installApp} className="mt-3 block w-full border border-white/30 py-4 text-center font-semibold transition-colors hover:bg-white/10">
                  Install app
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function FloatingContact() {
  return (
    <a href={C.wa} target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" className="fixed bottom-4 right-4 z-[60] flex items-center gap-2" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      <span className="hidden bg-white px-3 py-1.5 text-sm text-ink shadow-md sm:block">Contact us</span>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-marigold text-ink shadow-xl transition-transform duration-300 hover:scale-110">
        <Icon d={icons.wa} size={26} />
      </span>
    </a>
  )
}

export function Banner({ title, image, text }) {
  return (
    <section className="relative flex h-[52vh] min-h-[360px] items-end overflow-hidden bg-ink text-white">
      <ParallaxImg src={image} alt="" className="absolute inset-0 opacity-60" amount={50} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/90" />
      <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-14 md:px-8">
        <Lines as="h1" className="max-w-[18ch] text-[clamp(2.6rem,6vw,5rem)]" delay={0.25}>{title}</Lines>
        {text && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="mt-4 max-w-xl text-white/80">{text}</motion.p>}
      </div>
    </section>
  )
}

export function Footer() {
  const col = 'mb-5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-flame'
  const link = 'block py-1.5 text-sm leading-relaxed text-white/65 transition-colors duration-200 hover:text-white focus-visible:text-white'
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-marigold bg-ink px-5 pb-7 pt-12 text-white/75 md:px-8 md:pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-sindoor/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1320px]">
        <div className="mb-12 flex flex-col gap-6 border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-flame">A sacred moment, made yours</p>
            <h2 className="mt-2 max-w-xl font-display text-2xl leading-tight text-white md:text-3xl">Planning a wedding or a family celebration?</h2>
            <p className="mt-2 text-sm text-white/60">Tell us about your day. We’ll guide you through the ceremony.</p>
          </div>
          <Link to="/book" className="inline-flex shrink-0 items-center justify-center gap-3 bg-sindoor px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-marigold hover:text-ink focus-visible:outline-offset-4">
            Plan your aarti <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="mb-10 border-b border-white/10 pb-10 text-center font-deva text-lg leading-loose text-flame md:mb-12 md:pb-12 md:text-xl">
          {SHLOKA[0]}<br />{SHLOKA[1]}
        </p>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_.95fr_.8fr_1.25fr] lg:gap-8">
          <div>
            <Link to="/" aria-label="Ganga Arti Wedding Event home" className="inline-block">
              <img src={logo} alt="Ganga Arti Wedding Event" loading="lazy" className="mb-5 h-20 w-20 rounded-full object-cover ring-1 ring-marigold/40" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">The sacred light of Kashi, at your celebration. Wedding Ganga Aarti across India and overseas.</p>
            <div className="mt-5 flex gap-2.5">
              {[['Instagram', C.insta, icons.insta], ['WhatsApp', C.wa, icons.wa], ['Call', C.tel, icons.phone], ['Email', 'mailto:' + C.email, icons.mail]].map(([label, href, icon]) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-marigold hover:bg-marigold hover:text-ink">
                  <Icon d={icon} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className={col}>Ceremonies</h3>
            {services.map((service) => <Link key={service.title} to="/services" className={link}>{service.title}</Link>)}
          </div>
          <div>
            <h3 className={col}>Explore</h3>
            {NAV.filter((item) => !item.cta).map((item) => <Link key={item.to} to={item.to} className={link}>{item.label}</Link>)}
            <Link to="/book" className={link}>Book Aarti</Link>
          </div>
          <div>
            <h3 className={col}>Talk to our team</h3>
            <a href={C.tel} className={link}>{C.phone}</a>
            <a href={'mailto:' + C.email} className={link + ' break-all'}>{C.email}</a>
            <a href={C.insta} target="_blank" rel="noopener noreferrer" className={link}>{C.handle}</a>
            <a href={C.map} target="_blank" rel="noopener noreferrer" className={link + ' mt-2 leading-relaxed'}>{C.address}<span className="mt-1 block text-xs text-flame">Open in Maps →</span></a>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-5 text-xs text-white/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Ganga Arti Wedding Event. Plan, celebrate, forever.</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-flame focus-visible:text-flame">
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

/** Route change: a dark curtain wipes across, the page swaps behind it, then lifts. */
export function PageTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div key={pathname} className="relative" initial="in" animate="idle" exit="out">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] bg-ink"
          variants={{
            in: { scaleY: 1, originY: 0 },
            idle: { scaleY: 0, originY: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 } },
            out: { scaleY: 1, originY: 1, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
