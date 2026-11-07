# Ganga Arti Wedding Event: website

React 18 + Vite + Tailwind CSS 3 + Framer Motion + React Router.

## Run
```
npm install
npm run dev        # local development
npm run build      # production build in /dist (already included)
npm run preview    # preview the build
```

## Deploy
Connect this repository to Vercel and deploy the app directory. The Vercel rewrite serves the React app for routes such as `/about` and `/gallery`; `vercel.json` also applies production security headers. The production build output is `dist/`.

### Connect a Hostinger domain
1. Purchase your preferred domain at Hostinger.
2. Add the domain in the Vercel project's **Settings → Domains** and follow the exact DNS records Vercel displays.
3. Configure the `www` and root domain in Vercel, choose one as the primary domain, and redirect the other to it.
4. Wait for Vercel to verify DNS and issue HTTPS before sharing the site.
5. In Google Search Console, verify the domain, submit `/sitemap.xml`, and request indexing for the homepage and key service pages.

Search position is determined by Google and cannot be guaranteed. Keep the business name, phone, address and service area consistent with the Google Business Profile, replace sample testimonials with genuine reviews, and publish a sitemap once the final domain is known.

## PWA and security
- The production service worker caches the app shell and a limited number of same-origin static assets for offline visits; large video files are not cached.
- Installable PWA icons and the web app manifest are in `public/`.
- Vercel response headers set HTTPS transport, content-type and framing protections, a referrer policy, permissions policy and a content security policy.
- Local `.mcp.json`, `.claude/`, dependencies and generated build output are excluded from Git.

## Where things are
- `src/data.js`: phone, email, address, services, FAQs, testimonials. Edit text here.
- `src/media.js`, `src/assets/` and `demo_media/videos/`: photos, video posters and the videos shown in the gallery.
- `src/sections.jsx`: hero, services list, gallery, testimonials, booking form.
- `src/fx.jsx`: the animation components (word reveal, scroll text reveal, magnetic buttons, wipe reveal, parallax, marquee, embers).
- `src/layout.jsx`: header, mobile menu, footer, page transition curtain.
- `tailwind.config.js`: colours and fonts.

## Before launch
- The testimonials in `src/data.js` are samples. Replace them with real client words.
- The booking form opens WhatsApp (91298 36221) with the details filled in.
- Gallery videos use their embedded audio. Open a video and press the player's Play button; browsers block unmuted autoplay until a user interacts.
- `npm run build:demo` makes a single-HTML demo with large video files alongside it in `dist-demo/`; deploy the entire folder.

## Tooling notes
- `.mcp.json`: 21st.dev MCP server config. Set the environment variable `API_KEY_21ST` and open the folder in Claude Code.
- `.claude/skills/ui-ux-pro-max`: the UI UX Pro Max skill for Claude Code.
- Skiper UI components were not reachable while building, so the effects in `src/fx.jsx` are written in the same spirit (Framer Motion). To add a real Skiper UI component, paste it into `src/` and import it.
