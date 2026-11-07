import { Link } from 'react-router-dom'
import { img, alt } from './media.js'
import { Banner } from './layout.jsx'
import { Wrap, H2, Hero, Intro, HomeServiceCards, ServiceList, AboutBlock, Process, Included, GallerySection, TestimonialRows, Faq, BookingForm, BookingSide, ContactBlock, Cta } from './sections.jsx'
import { Wipe, ParallaxImg, Lines } from './fx.jsx'
import { C } from './data.js'

const linkCls = 'inline-block border-b border-ink/60 pb-0.5 transition-colors duration-300 hover:border-sindoor hover:text-sindoor'
const Section = ({ children, className = '' }) => <section className={'py-24 md:py-32 ' + className}><Wrap>{children}</Wrap></section>

export function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Section>
        <H2 className="mb-12 max-w-[18ch]">What we perform</H2>
        <HomeServiceCards />
        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-ink/15 pt-7 sm:flex-row sm:items-center">
          <p className="max-w-xl text-ink/75">Not sure which ceremony fits your celebration? We can help you plan it.</p>
          <Link to="/book" className="inline-flex shrink-0 items-center gap-2 bg-sindoor px-6 py-3 font-semibold text-white transition-colors hover:bg-ink">
            Tell us about your day <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>
      <section className="bg-ghat"><AboutBlock /></section>
      <Process />
      <Section>
        <H2 className="mb-10">Moments from the aarti</H2>
        <GallerySection limit />
        <Link to="/gallery" className={linkCls + ' mt-10'}>See all photos and videos</Link>
      </Section>
      <section className="bg-ink py-24 text-white md:py-32">
        <Wrap><H2 className="mb-12 max-w-[18ch]">What families say</H2></Wrap>
        <TestimonialRows />
      </section>
      <Section><H2 className="mb-10">Questions we are often asked</H2><Faq /></Section>
      <section className="bg-ghat py-24 md:py-32">
        <Wrap className="grid gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div><H2 className="mb-10 max-w-[14ch]">Tell us about your day</H2><BookingForm /></div>
          <div className="lg:pt-24"><BookingSide /></div>
        </Wrap>
      </section>
      <Section><H2 className="mb-10">Find us</H2><ContactBlock /></Section>
      <Cta />
    </>
  )
}

export function About() {
  return (
    <>
      <Banner title="A small team from Kashi, here for your wedding" image={img.group} />
      <AboutBlock link={false} />
      <section className="bg-ghat py-24 md:py-32">
        <Wrap>
          <H2 className="mb-12 max-w-[16ch]">How we work</H2>
          <div className="grid gap-12 md:grid-cols-3">
            {[['The ritual comes first', 'Every aarti follows the sequence we learned on the ghats. We do not shorten the mantras to fit a schedule, we plan the schedule around them.'], ['Calm for the family', 'Weddings are busy. We arrive early, set up quietly and tell your family exactly what to do, in simple words, before we begin.'], ['Clear arrangements', 'You know the date, the timing and what we bring before the day. No surprises, no last-minute asks.']].map(([a, b]) => (
              <div key={a} className="border-t-2 border-marigold pt-5"><h3 className="text-2xl">{a}</h3><p className="mt-3 text-ink/75">{b}</p></div>
            ))}
          </div>
        </Wrap>
      </section>
      <Section>
        <Lines as="p" className="mx-auto max-w-[24ch] text-center font-display text-[clamp(1.9rem,3.8vw,3.2rem)] leading-tight">An aarti is not a performance. It is an offering, and we make sure it stays one.</Lines>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {['night', 'lamps', 'diya'].map((k) => <Wipe key={k}><ParallaxImg src={img[k]} alt={alt[k]} className="aspect-[3/4]" /></Wipe>)}
        </div>
      </Section>
      <Cta />
    </>
  )
}

export function Services() {
  return (
    <>
      <Banner title="Ceremonies we perform" image={img.stage} text="From a short blessing before the pheras to a full evening aarti for all your guests." />
      <Section><ServiceList /></Section>
      <section className="bg-ghat"><Included /></section>
      <Process />
      <Section><H2 className="mb-10">Questions we are often asked</H2><Faq /></Section>
      <Cta />
    </>
  )
}

export function GalleryPage() {
  return (
    <>
      <Banner title="Moments from the aarti" image={img.night} text="Photos and videos from weddings and events we have performed at." />
      <Section><GallerySection /></Section>
      <Cta />
    </>
  )
}

export function Testimonials() {
  return (
    <>
      <Banner title="What families say" image={img.portrait} />
      <section className="bg-ink py-24 text-white"><TestimonialRows /></section>
      <Section>
        <H2 className="mb-10 max-w-[20ch]">Planning your own aarti?</H2>
        <p className="mb-8 max-w-xl text-ink/75">Tell us your date and venue. We will call you back within a day and walk you through how it will go.</p>
        <Link to="/book" className="inline-block bg-sindoor px-8 py-4 font-bold tracking-wide text-white transition-colors hover:bg-ink">Book Aarti</Link>
      </Section>
    </>
  )
}

export function Contact() {
  return (
    <>
      <Banner title="Let us talk about your aarti" image={img.smoke} />
      <Section><ContactBlock /></Section>
      <Section className="bg-ghat">
        <div className="grid gap-4 md:grid-cols-3">
          {['group', 'entry', 'lamps'].map((k) => <Wipe key={k}><ParallaxImg src={img[k]} alt={alt[k]} className="aspect-[4/5]" /></Wipe>)}
        </div>
        <p className="mt-10 max-w-xl text-ink/75">We are based in Varanasi and travel to your venue across India and overseas. <a className={linkCls} href={C.map} target="_blank" rel="noopener noreferrer">Open our address in Maps</a>.</p>
      </Section>
      <Cta />
    </>
  )
}

export function Booking() {
  return (
    <>
      <Banner title="Tell us about your day" image={img.lamps} text="Share a few details and we will get back to you within a day." />
      <section className="bg-ghat py-24">
        <Wrap className="grid gap-14 lg:grid-cols-[1.15fr_.85fr]"><BookingForm /><BookingSide /></Wrap>
      </section>
    </>
  )
}

export function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-ghat px-6 pt-32 text-center">
      <div><Lines as="h1" className="mx-auto max-w-[14ch] text-[clamp(2.2rem,4.6vw,4rem)]">This page could not be found</Lines><Link to="/" className={linkCls + ' mt-8'}>Back to the home page</Link></div>
    </section>
  )
}
