import { img } from './media.js'

export const C = {
  phone: '+91 91298 36221',
  tel: 'tel:+919129836221',
  email: 'tavinashpati@gmail.com',
  insta: 'https://www.instagram.com/gangaaartieventsorganizer',
  handle: '@gangaaartieventsorganizer',
  address: 'A Bhadaini, B2/236, Assi - Lanka Rd, Anandbagh, Bhelupur, Varanasi, Uttar Pradesh 221001',
  map: 'https://www.google.com/maps/search/?api=1&query=A+Bhadaini+B2%2F236+Assi+Lanka+Rd+Bhelupur+Varanasi+221001',
  wa: 'https://wa.me/919129836221?text=' + encodeURIComponent('Namaste, I would like to enquire about a Ganga Aarti.'),
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Our Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
  { to: '/book', label: 'Book Aarti', cta: true },
]

export const SHLOKA = ['गङ्गे च यमुने चैव गोदावरि सरस्वति।', 'नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥']
export const SHLOKA_EN = 'O Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu, Kaveri, be present in this water.'

export const services = [
  { title: 'Wedding Ganga Aarti', image: img.stage, text: 'Before the pheras, at the sangeet, or to welcome the baraat. The lamps, conches and chanting are arranged around your venue and your muhurat.' },
  { title: 'Griha Pravesh and Pooja', image: img.pooja, text: 'Griha pravesh, satyanarayan katha and house blessings, with the kalash, flowers and offerings set out the right way.' },
  { title: 'Aarti for events', image: img.diya, text: 'Family gatherings, anniversaries, cultural and corporate evenings. A shorter aarti for guests who may be seeing one for the first time.' },
  { title: 'Ghat Aarti in Varanasi', image: img.night, text: 'The evening aarti on the ghats for your family, with a boat ride and a guided walk through the temples if you would like one.' },
  { title: 'Havan, Rudrabhishek and Katha', image: img.smoke, text: 'Vedic rituals performed by acharyas, for homes, mandirs and family occasions.' },
]

export const included = [
  'Muhurat guidance as per the Panchang',
  'Experienced acharyas and pandits',
  'Aarti lamps, diya and samagri',
  'Flowers and the ritual setup',
  'The correct mantra sequence',
  'Guidance for the couple and the family',
]

export const steps = [
  { title: 'Tell us', text: 'Share your date, venue and city on WhatsApp or a call.' },
  { title: 'We guide you', text: 'We explain the ceremony and what your family should keep ready.' },
  { title: 'Fix the muhurat', text: 'Date, venue and auspicious time are confirmed together.' },
  { title: 'The aarti', text: 'We arrive early, set up the lamps and perform. You only have to stand and receive it.' },
]

export const faqs = [
  { q: 'What is a Wedding Ganga Aarti?', a: 'It is an aarti offered to Maa Ganga during the wedding, to ask for blessings for the couple and both families. Pandits perform it with lamps, conches, flowers and the proper mantras.' },
  { q: 'Can you come to our venue?', a: 'Yes. We perform at hotels, resorts, palaces, lawns and private homes, across India and overseas. If you would rather do it in Varanasi, we arrange that too.' },
  { q: 'How long does the aarti take?', a: 'Usually 30 to 45 minutes. We can shorten it or time it around your muhurat and the rest of the programme.' },
  { q: 'What do we need to arrange?', a: 'A clear open space and a few tables. We bring the lamps, the samagri and the rest of the setup.' },
  { q: 'How do I book?', a: 'Message or call us with your date, venue and city. We guide you on the ritual and confirm the muhurat with you.' },
]

// Sample testimonials. Replace with real words from your clients before launch.
export const testimonials = [
  { t: 'We had our pheras at nine and the aarti was set for eight. Panditji’s team were there an hour early, lamps lit, nobody had to ask them for anything. My nani cried through the whole thing.', n: 'Priya and Karan', p: 'Wedding, Jaipur' },
  { t: 'I was worried a banquet hall would feel flat. It did not. The conch, the smoke, the lamps going up together, and the guests just went quiet.', n: 'Mohit Agarwal', p: 'Sangeet evening, Delhi' },
  { t: 'They explained every step to my parents in simple Hindi before starting. That mattered to us more than the decor.', n: 'Neha Tripathi', p: 'Pre-wedding blessing, Lucknow' },
  { t: 'Booked on WhatsApp in one evening. Dates, timing, samagri, all clear. No surprise extras on the day.', n: 'Ankit Sharma', p: 'Reception, Noida' },
  { t: 'Our guests from Canada asked if they could stand closer. Some of them had never seen an aarti before.', n: 'Ritu and Sameer', p: 'Destination wedding, Udaipur' },
  { t: 'Respectful, calm and on time. That is all I wanted, and more than I expected.', n: 'Dr. S. Mishra', p: 'Griha pravesh, Kanpur' },
]

export const photoOrder = ['stage', 'entry', 'group', 'night', 'lamps', 'portrait', 'diya', 'smoke', 'pooja']
export const bestPhotos = ['stage', 'night', 'group', 'portrait', 'entry', 'lamps']
