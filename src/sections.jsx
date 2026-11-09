import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { img, alt, videos } from './media.js'
import { C, SHLOKA, SHLOKA_EN, services, steps, faqs, testimonials, photoOrder, bestPhotos, included } from './data.js'
import { Lines, TextReveal, Magnetic, Wipe, ParallaxImg, Marquee, Embers, ease } from './fx.jsx'
import { Icon, icons } from './layout.jsx'

export const Wrap = ({ children, className = '' }) => <div className={'mx-auto max-w-[1320px] px-5 md:px-8 ' + className}>{children}</div>
export const H2 = ({ children, className = '' }) => <Lines className={'text-[clamp(2.2rem,4.6vw,4rem)] ' + className}>{children}</Lines>
const linkCls = 'inline-block border-b border-ink/60 pb-0.5 transition-colors duration-300 hover:border-sindoor hover:text-sindoor'

/* ---------- Hero ---------- */
// The smallest gallery clip follows the photos to keep autoplay data-light.
const slides = [
  { type: 'image', src: img.night, pos: '50% 30%', duration: 6500 },
  { type: 'image', src: img.stage, pos: '50% 35%', duration: 6500 },
  { type: 'image', src: img.hero3, pos: '50% 40%', duration: 6500 },
]
export function Hero() {
  const ref = useRef(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    slides.forEach((slide, idx) => {
      if (slide.type !== 'image' || idx === 0) return
      const image = new Image()
      image.src = slide.src
      image.onload = () => {
        // Image pre-loaded successfully
      }
    })
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  useEffect(() => {
    const timer = window.setTimeout(() => setI((current) => (current + 1) % slides.length), slides[i].duration)
    return () => window.clearTimeout(timer)
  }, [i])
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white">
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[6%]">
        <AnimatePresence>
          <motion.img
            key={i}
            src={slides[i].src}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: slides[i].pos }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/15 to-ink/85" />
      <Embers />
      <motion.div className="absolute inset-x-0 bottom-[17%]">
        <Wrap>
          <Lines as="h1" className="max-w-[13ch] text-[clamp(2.9rem,7.6vw,6.6rem)]" reveal={false}>Bring the sacred light of Kashi to your wedding.</Lines>
          <motion.p initial={false} animate={{ opacity: 1, y: 0 }} className="mt-6 max-w-lg text-lg text-white/85">
            Wedding Ganga Aarti by acharyas and pandits from Kashi, with lamps, flowers and samagri, at your venue anywhere in India and overseas.
          </motion.p>
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="mt-9 flex flex-wrap gap-4">
            <Magnetic><Link to="/book" className="block bg-sindoor px-8 py-4 text-base font-bold tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-ink">Plan your aarti</Link></Magnetic>
            <Magnetic><Link to="/gallery" className="block border border-white/60 px-8 py-4 text-base tracking-wide transition-colors duration-300 hover:border-white hover:bg-white/10">Watch the aarti</Link></Magnetic>
          </motion.div>
        </Wrap>
      </motion.div>
      <div className="absolute bottom-[88px] right-5 z-10 flex items-center gap-3 text-sm md:right-8" aria-hidden="true">
        <span className="sr-only">Slide {i + 1} of {slides.length}</span>
        <span className="sm:not-sr-only">0{i + 1} / 0{slides.length}</span>
        {slides.map((_, n) => (
          <span key={n} className="relative h-[2px] w-10 overflow-hidden bg-white/30">
            {n === i && <motion.span className="absolute inset-0 origin-left bg-white" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: slides[i].duration / 1000, ease: 'linear' }} />}
          </span>
        ))}
      </div>
      {/* the ghat steps: the one structural motif of the page */}
      <svg className="absolute bottom-[-1px] left-0 h-[64px] w-full fill-ghat" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 64V8H144V14H288V20H432V26H576V32H720V38H864V44H1008V50H1152V56H1296V62H1440V64Z" />
      </svg>
    </section>
  )
}

/* ---------- Intro ---------- */
export function Intro() {
  return (
    <section className="bg-ghat pb-24 pt-16 md:pb-36 md:pt-24">
      <Wrap className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TextReveal
            className="font-display text-[clamp(1.9rem,3.7vw,3.3rem)] leading-[1.22]"
            text="Ganga does not need a riverbank to be present. What brings her into the room is mantra, intention and a ritual done the right way. So an aarti on a lawn in Delhi or a resort in Goa carries the same weight as one on the ghats of Kashi."
          />
          <div className="mt-14 border-l-2 border-marigold pl-6">
            <p className="font-deva text-xl leading-loose text-sindoor">{SHLOKA[0]}<br />{SHLOKA[1]}</p>
            <p className="mt-2 max-w-md text-sm text-ink/70">{SHLOKA_EN}</p>
          </div>
        </div>
        <div className="lg:col-span-5">
          <Wipe><ParallaxImg src={img.lamps} alt={alt.lamps} className="aspect-[4/5]" /></Wipe>
        </div>
      </Wrap>
    </section>
  )
}

/* ---------- Services (cursor-following image preview) ---------- */
export function ServiceList() {
  const [a, setA] = useState(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 20 }), sy = useSpring(y, { stiffness: 140, damping: 20 })
  return (
    <div onMouseMove={(e) => { x.set(e.clientX); y.set(e.clientY) }} onMouseLeave={() => setA(null)}>
      <ul className="border-t border-ink/20">
        {services.map((s, i) => (
          <li key={s.title} onMouseEnter={() => setA(i)}>
            <Link to="/services" className={`group grid gap-3 border-b border-ink/20 py-8 transition-opacity duration-300 md:grid-cols-[1.1fr_1fr] md:items-baseline ${a !== null && a !== i ? 'md:opacity-30' : ''}`}>
              <h3 className="text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">{s.title}</h3>
              <div>
                <p className="max-w-lg text-ink/75">{s.text}</p>
                <img src={s.image} alt="" loading="lazy" className="mt-4 h-44 w-full object-cover md:hidden" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {a !== null && (
          <motion.div key="pv" style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
            <motion.div className="-ml-[150px] -mt-[110px] h-[220px] w-[300px] overflow-hidden shadow-2xl" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.35, ease }}>
              <AnimatePresence mode="popLayout">
                <motion.img key={a} src={services[a].image} alt="" className="h-full w-full object-cover" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.45, ease }} />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function HomeServiceCards() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {services.slice(0, 3).map((service) => (
        <Link
          key={service.title}
          to="/services"
          className="group overflow-hidden border border-ink/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-offset-4"
        >
          <div className="aspect-[4/3] overflow-hidden bg-ink/10">
            <img
              src={service.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
            />
          </div>
          <div className="p-6 md:p-7">
            <h3 className="text-2xl transition-colors group-hover:text-sindoor">{service.title}</h3>
            <p className="mt-3 text-base text-ink/70">{service.text}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-sindoor">
              Explore service <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

/* ---------- About ---------- */
export function AboutBlock({ link = true }) {
  return (
    <Wrap className="grid items-center gap-16 py-24 md:py-32 lg:grid-cols-2">
      <div className="relative pb-16">
        <Wipe className="w-[82%]"><ParallaxImg src={img.group} alt={alt.group} className="aspect-[5/6]" /></Wipe>
        <Wipe className="absolute bottom-0 right-0 w-[42%] border-8 border-paper bg-paper"><ParallaxImg src={img.portrait} alt={alt.portrait} className="aspect-[4/5]" amount={20} /></Wipe>
      </div>
      <div>
        <H2>Born on the ghats, now at your celebration.</H2>
        <p className="mt-6 max-w-xl text-ink/80">We are a small team of acharyas and pandits from Kashi. Most of us grew up watching the evening aarti at the ghats, and learned the lamps, the chants and the timing from the people who did it before us.</p>
        <p className="mt-4 max-w-xl text-ink/80">Weddings gave us a new place to offer the same aarti. We keep it simple: the right mantras in the right order, a calm atmosphere for the family, and nothing staged just for the camera.</p>
        {link && <Link to="/about" className={linkCls + ' mt-8'}>Read our story</Link>}
      </div>
    </Wrap>
  )
}

/* ---------- Process (a real sequence, so it is numbered) ---------- */
export function Process({ dark = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.7'] })
  const w = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section ref={ref} className={dark ? 'relative bg-ink py-24 text-white md:py-32' : 'relative py-24 md:py-32'}>
      <Wrap>
        <H2 className="max-w-[16ch]">From first message to the last lamp</H2>
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[15px] hidden h-px bg-current opacity-20 md:block" />
          <motion.div style={{ width: w }} className="absolute left-0 top-[15px] hidden h-px bg-marigold md:block" />
          <ol className="grid gap-10 md:grid-cols-4">
            {steps.map((s, n) => (
              <li key={s.title}>
                <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-marigold text-sm font-bold text-ink">{n + 1}</span>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 max-w-xs opacity-75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </section>
  )
}

export function Included() {
  return (
    <Wrap className="py-24">
      <H2>What is included</H2>
      <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
        {included.map((t) => <li key={t} className="flex gap-4 border-b border-ink/15 py-4"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-marigold" />{t}</li>)}
      </ul>
    </Wrap>
  )
}

/* ---------- Gallery: Photos and Videos tabs + lightbox ---------- */
function Lightbox({ items, index, setIndex, close }) {
  const it = items[index]
  const videoRef = useRef(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    close()
  }

  useEffect(() => {
    const video = videoRef.current
    return () => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [index])

  useEffect(() => {
    const previousFocus = document.activeElement
    closeButtonRef.current?.focus()
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleClose()
      if (event.key === 'ArrowRight') setIndex((index + 1) % items.length)
      if (event.key === 'ArrowLeft') setIndex((index - 1 + items.length) % items.length)
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), video[controls]')
      if (!focusable?.length) return

      const elements = Array.from(focusable)
      const currentIndex = elements.indexOf(document.activeElement)
      const nextIndex = event.shiftKey
        ? (currentIndex <= 0 ? elements.length - 1 : currentIndex - 1)
        : (currentIndex < 0 || currentIndex === elements.length - 1 ? 0 : currentIndex + 1)
      event.preventDefault()
      elements[nextIndex].focus()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [index, items.length, setIndex])

  const btn = 'absolute top-1/2 -translate-y-1/2 p-4 text-4xl text-white/80 hover:text-white'

  return (
    <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Gallery viewer" className="fixed inset-0 z-[95] flex items-center justify-center bg-black/95 p-4 md:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.stopPropagation()}>
      <button ref={closeButtonRef} className="absolute right-4 top-3 p-3 text-3xl text-white/80 hover:text-white" aria-label="Close" onClick={handleClose}>✕</button>
      <button className={btn + ' left-1'} aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + items.length) % items.length) }}>‹</button>
      <button className={btn + ' right-1'} aria-label="Next" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % items.length) }}>›</button>
      <motion.div key={index} className="flex max-h-full max-w-full flex-col items-center" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}>
        {it.video ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={it.src}
              poster={it.poster}
              controls
              playsInline
              loop
              preload="metadata"
              className="max-h-[82vh] max-w-full"
              aria-label={it.title}
            />
          </div>
        ) : (
          <img src={it.src} alt={it.alt} className="max-h-[82vh] max-w-full object-contain" />
        )}
        <p className="mt-3 text-sm text-white/70">{it.alt || it.title}</p>
      </motion.div>
    </motion.div>
  )
}

export function GallerySection({ limit = false }) {
  const [tab, setTab] = useState('photos')
  const [open, setOpen] = useState(null)
  const photoKeys = limit ? bestPhotos : photoOrder
  const photos = photoKeys.map((k) => ({ src: img[k], alt: alt[k] }))
  const vids = (limit ? videos.slice(0, 3) : videos).map((v) => ({ ...v, video: true, alt: v.title }))
  const items = tab === 'photos' ? photos : vids
  return (
    <div>
      <div role="tablist" className="relative inline-flex border border-ink">
        {[['photos', 'Photos', photoOrder.length], ['videos', 'Videos', videos.length]].map(([k, l, n]) => (
          <button key={k} id={`gallery-tab-${k}`} type="button" role="tab" aria-controls="gallery-panel" aria-selected={tab === k} onClick={() => setTab(k)} className={`relative px-6 py-3 text-sm font-bold tracking-wide transition-colors duration-300 sm:px-8 ${tab === k ? 'text-white' : 'hover:bg-ghat'}`}>
            {tab === k && <motion.span layoutId="gtab" className="absolute inset-0 bg-ink" transition={{ duration: 0.4, ease }} />}
            <span className="relative">{l} <span className="opacity-60">{limit ? '' : n}</span></span>
          </button>
        ))}
      </div>
      <div id="gallery-panel" role="tabpanel" aria-labelledby={`gallery-tab-${tab}`} tabIndex={0} className="mt-8 grid grid-cols-2 items-start gap-3 sm:gap-4 md:grid-cols-3">
        {items.map((it, n) => (
          <button key={it.src} type="button" onClick={() => setOpen(n)} className="group relative block aspect-[4/5] w-full overflow-hidden bg-black text-left" aria-label={it.video ? 'Play video: ' + it.title : 'View photo: ' + it.alt}>
            <img src={it.video ? it.poster : it.src} alt={it.video ? '' : it.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none" />
            {it.video && (
              <>
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-black/40 text-white transition-transform duration-300 group-hover:scale-110">▶</span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 font-display text-lg text-white">{it.title}</span>
              </>
            )}
          </button>
        ))}
      </div>
      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} setIndex={setOpen} close={() => setOpen(null)} />}</AnimatePresence>
    </div>
  )
}

/* ---------- Testimonials ---------- */
function Quote({ q }) {
  return (
    <figure className="w-[340px] shrink-0 whitespace-normal border border-ink/10 bg-white p-7 text-ink md:w-[400px]">
      <blockquote className="font-display text-[1.28rem] leading-snug">“{q.t}”</blockquote>
      <figcaption className="mt-5 text-sm text-ink/70"><b className="font-bold text-ink">{q.n}</b>, {q.p}</figcaption>
    </figure>
  )
}
export function TestimonialRows() {
  const [paused, setPaused] = useState(false)
  return (
    <div>
      <div className="space-y-6">
        <Marquee paused={paused} speed={80}>{testimonials.map((q) => <Quote key={q.n} q={q} />)}</Marquee>
        <Marquee paused={paused} reverse speed={95}>{[...testimonials].reverse().map((q) => <Quote key={q.n} q={q} />)}</Marquee>
      </div>
      <Wrap className="mt-8"><button onClick={() => setPaused(!paused)} aria-pressed={paused} className="border border-white/40 px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-ink">{paused ? 'Resume scrolling' : 'Pause scrolling'}</button></Wrap>
    </div>
  )
}

/* ---------- FAQ ---------- */
export function Faq() {
  const [o, setO] = useState(0)
  return (
    <div className="max-w-3xl border-t border-ink/20">
      {faqs.map((f, i) => (
        <div key={f.q} className="border-b border-ink/20">
          <button className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>
            {f.q}
            <motion.span animate={{ rotate: o === i ? 45 : 0 }} className="text-3xl text-marigold">+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {o === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden"><p className="max-w-2xl pb-6 text-ink/75">{f.a}</p></motion.div>}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ---------- Booking form ---------- */
const types = ['Wedding Ganga Aarti', 'Griha Pravesh / Pooja', 'Event aarti', 'Ghat Aarti, Varanasi', 'Havan / Katha']
export function BookingForm() {
  const [f, setF] = useState({ n: '', p: '', e: types[0], d: '', g: '', c: '', m: '' })
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(null)
  const set = (k) => (e) => {
    setF((current) => ({ ...current, [k]: e.target.value }))
    if (k === 'p') setErr('')
  }
  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const submit = (e) => {
    e.preventDefault()
    if (!/^[0-9]{10}$/.test(f.p)) return setErr('Enter a 10-digit mobile number, without +91.')
    setErr('')
    const t = ['Namaste! I would like to enquire about a Ganga Aarti.', 'Name: ' + f.n, 'Phone: +91 ' + f.p, 'Ceremony: ' + f.e, 'Date: ' + (f.d || 'not fixed yet'), 'Guests: ' + (f.g || '-'), 'Venue / city: ' + (f.c || '-'), 'Note: ' + (f.m || '-')].join('\n')
    const whatsappWindow = window.open('https://wa.me/919129836221?text=' + encodeURIComponent(t), '_blank')
    if (whatsappWindow) whatsappWindow.opener = null
    setSent({
      whatsappBlocked: !whatsappWindow,
      email: 'mailto:' + C.email + '?subject=' + encodeURIComponent('Ganga Aarti enquiry') + '&body=' + encodeURIComponent(t),
    })
  }
  const lab = 'mb-2 block text-sm font-semibold text-ink/80'
  const inp = 'w-full border border-ink/15 bg-paper/60 px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/40 hover:border-ink/30 focus:border-marigold focus:ring-2 focus:ring-marigold/20'
  return (
    <form onSubmit={submit} className="space-y-7 border border-ink/10 border-t-[3px] border-t-marigold bg-white p-5 shadow-[0_30px_60px_-30px_rgba(16,28,38,.25)] sm:p-7 md:p-9">
      <div className="border-b border-ink/10 pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sindoor">Aarti enquiry</p>
        <h3 className="mt-2 text-3xl">Plan your aarti</h3>
        <p className="mt-2 text-[15px] text-ink/70">Share a few details. We’ll get back to you within a day.</p>
      </div>
      <div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className={lab} htmlFor="n">Your name <span className="text-sindoor">*</span></label><input id="n" required value={f.n} onChange={set('n')} autoComplete="name" placeholder="Name" className={inp} /></div>
          <div>
            <label className={lab} htmlFor="p">Mobile number <span className="text-sindoor">*</span></label>
            <div className="flex items-center">
              <span className="border border-r-0 border-ink/15 bg-ghat px-3 py-3 text-sm text-ink/70">+91</span>
              <input id="p" type="tel" required value={f.p} onChange={(event) => {
                setF((current) => ({ ...current, p: event.target.value.replace(/\D/g, '').slice(0, 10) }))
                setErr('')
              }} inputMode="numeric" maxLength={10} autoComplete="tel-national" aria-invalid={Boolean(err)} aria-describedby={err ? 'phone-error' : 'phone-hint'} placeholder="10-digit number" className={inp + ' min-w-0'} />
            </div>
            {err ? <p id="phone-error" role="alert" className="mt-2 text-sm text-sindoor">{err}</p> : <p id="phone-hint" className="mt-2 text-xs text-ink/55">Enter 10 digits, without +91.</p>}
          </div>
        </div>
      </div>
      <fieldset>
        <legend className={lab}>What would you like to book? <span className="text-sindoor">*</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {types.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="e" className="peer sr-only" checked={f.e === t} onChange={() => setF((current) => ({ ...current, e: t }))} />
              <span className="block border border-ink/20 px-4 py-2.5 text-sm transition-colors duration-200 hover:border-marigold peer-checked:border-marigold peer-checked:bg-marigold/15 peer-checked:font-bold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={lab} htmlFor="d">Event date</label><input id="d" type="date" min={minDate} value={f.d} onChange={set('d')} className={inp} /></div>
        <div><label className={lab} htmlFor="g">Expected guests</label><select id="g" value={f.g} onChange={set('g')} className={inp}><option value="">Choose an estimate</option><option>Up to 100</option><option>100 to 300</option><option>300 to 500</option><option>500+</option></select></div>
      </div>
      <div><label className={lab} htmlFor="c">Venue and city</label><input id="c" value={f.c} onChange={set('c')} autoComplete="address-level2" placeholder="Hotel or venue, city" className={inp} /></div>
      <div><label className={lab} htmlFor="m">Anything else we should know?</label><textarea id="m" rows={3} value={f.m} onChange={set('m')} placeholder="Timing, muhurat or family traditions" className={inp + ' resize-y'} /></div>
      <button type="submit" className="flex w-full items-center justify-center gap-3 bg-sindoor px-5 py-4 text-base font-bold tracking-wide text-white transition-colors duration-300 hover:bg-ink focus-visible:outline-offset-4">
        Send enquiry on WhatsApp <span aria-hidden="true">→</span>
      </button>
      <AnimatePresence>
        {sent && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden border border-ink/10 bg-ghat px-4 py-3 text-[15px]" role="status">
          {sent.whatsappBlocked ? 'Your browser blocked the WhatsApp window. ' : 'Dhanyavad! Your enquiry is ready in WhatsApp. '}
          <a className={linkCls} href={sent.email}>Send it by email instead.</a>
        </motion.p>}
      </AnimatePresence>
    </form>
  )
}

export function BookingSide() {
  return (
    <div className="mx-auto max-w-xl lg:mx-0">
      <Wipe><img src={img.diya} alt={alt.diya} loading="lazy" className="aspect-[4/5] w-full object-cover" /></Wipe>
      <ul className="mt-6">
        {[['Reply within a day', 'We call or message you back to confirm the details.'], ['Muhurat guidance', 'Date and time are chosen as per the Panchang, together with you.'], ['India and overseas', 'We travel to your venue with the full setup.']].map(([a, b]) => (
          <li key={a} className="border-b border-ink/15 py-4"><b className="block font-display text-xl font-normal">{a}</b><span className="text-[15px] text-ink/70">{b}</span></li>
        ))}
      </ul>
      <p className="mt-5 text-ink/75">Prefer to talk? Call <a className={linkCls} href={C.tel}>{C.phone}</a> or write to <a className={linkCls} href={'mailto:' + C.email}>{C.email}</a>.</p>
    </div>
  )
}

/* ---------- Contact ---------- */
export function ContactBlock() {
  const rows = [
    ['Call', C.phone, C.tel, icons.phone],
    ['WhatsApp', 'Message us', C.wa, icons.wa],
    ['Email', C.email, 'mailto:' + C.email, icons.mail],
    ['Instagram', C.handle, C.insta, icons.insta],
    ['Visit us', C.address, C.map, icons.pin],
  ]
  return (
    <ul className="grid gap-x-12 md:grid-cols-2">
      {rows.map(([l, v, h, d]) => (
        <li key={l} className="border-b border-ink/15">
          <a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-start gap-5 py-6">
            <span className="mt-1 text-marigold transition-transform duration-300 group-hover:scale-125"><Icon d={d} size={24} /></span>
            <span><b className="block font-display text-2xl font-normal">{l}</b><span className="text-ink/75 transition-colors group-hover:text-sindoor">{v}</span></span>
          </a>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Closing call-to-action ---------- */
export function Cta() {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-center text-white">
      <ParallaxImg src={img.night} alt="" className="absolute inset-0 opacity-35" amount={60} />
      <Embers />
      <Wrap className="relative">
        <H2 className="mx-auto max-w-[16ch]">Let the lamps be part of your wedding.</H2>
        <div className="mt-10"><Magnetic><Link to="/book" className="block bg-sindoor px-10 py-5 text-base font-bold tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-ink">Book your aarti</Link></Magnetic></div>
      </Wrap>
    </section>
  )
}
