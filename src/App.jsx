import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer, FloatingContact, PageTransition } from './layout.jsx'
import { Home, About, Services, GalleryPage, Testimonials, Contact, Booking, NotFound } from './pages.jsx'
import { C, services } from './data.js'

const routeSeo = {
  '/': {
    title: 'Wedding Ganga Aarti in India & Abroad | Ganga Arti',
    description: 'Book a Wedding Ganga Aarti performed by experienced acharyas and pandits from Kashi. Ritual lamps, flowers and samagri at wedding venues across India and overseas.',
  },
  '/about': {
    title: 'About Our Kashi Pandits | Ganga Arti Wedding Event',
    description: 'Meet the Varanasi acharyas and pandits who bring the traditional Ganga Aarti ritual to weddings and family celebrations.',
  },
  '/services': {
    title: 'Wedding Ganga Aarti & Ceremony Services | Ganga Arti',
    description: 'Explore wedding Ganga Aarti, Griha Pravesh, event aarti, Varanasi ghat aarti, havan and katha services across India and overseas.',
  },
  '/gallery': {
    title: 'Wedding Ganga Aarti Photos & Videos | Ganga Arti',
    description: 'See photos and videos of Ganga Aarti ceremonies performed by our Kashi team at weddings and celebrations.',
  },
  '/testimonials': {
    title: 'Wedding Ganga Aarti Reviews | Ganga Arti',
    description: 'Read what families say about the Ganga Aarti ceremonies performed by our team at weddings and celebrations.',
  },
  '/contact': {
    title: 'Contact Wedding Ganga Aarti Pandits | Ganga Arti',
    description: 'Contact our Varanasi-based team to plan a Wedding Ganga Aarti at your venue in India or overseas.',
  },
  '/book': {
    title: 'Book a Wedding Ganga Aarti | Ganga Arti',
    description: 'Enquire about a Wedding Ganga Aarti. Share your date, venue and ceremony details with our Kashi team.',
  },
}

export default function App() {
  const location = useLocation()
  useEffect(() => {
    const page = routeSeo[location.pathname] || {
      title: 'Page Not Found | Ganga Arti Wedding Event',
      description: 'This page could not be found. Visit Ganga Arti Wedding Event to plan a traditional Ganga Aarti for your celebration.',
    }
    const pageUrl = new URL(location.pathname, window.location.origin).href
    const imageUrl = new URL('/pwa-icon-512.png', window.location.origin).href
    document.title = page.title

    const setMeta = (selector, attribute, key, content) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    setMeta('meta[name="description"]', 'name', 'description', page.description)
    setMeta('meta[name="robots"]', 'name', 'robots', routeSeo[location.pathname] ? 'index, follow' : 'noindex, follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl)
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = pageUrl

    let structuredData = document.getElementById('business-structured-data')
    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.id = 'business-structured-data'
      structuredData.type = 'application/ld+json'
      document.head.appendChild(structuredData)
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Ganga Arti Wedding Event',
      description: 'Wedding Ganga Aarti and traditional Hindu ceremonies performed by acharyas and pandits from Varanasi, India.',
      url: window.location.origin,
      telephone: C.phone,
      email: C.email,
      image: imageUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B2/236, Assi - Lanka Road, Anandbagh, Bhelupur',
        addressLocality: 'Varanasi',
        addressRegion: 'Uttar Pradesh',
        postalCode: '221001',
        addressCountry: 'IN',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Place', name: 'International destinations' },
      ],
      sameAs: [C.insta],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Aarti and ceremony services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.title, description: service.text },
        })),
      },
    })
  }, [location.pathname])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main">
        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
