import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

// The shareable single-file demo uses an in-memory router; the real site uses normal URLs.
const Router = __DEMO__ ? MemoryRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </Router>
  </React.StrictMode>
)

if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service worker registration failed:', error)
      })
    })
  } else {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations
        .filter((registration) => registration.active?.scriptURL === new URL('/sw.js', window.location.origin).href)
        .forEach((registration) => registration.unregister())
    }).catch((error) => {
      console.error('Unable to clear development service workers:', error)
    })
  }
}
