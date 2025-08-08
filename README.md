# VpnWorldWallet

**VpnWorldWallet** is a lightweight, zero-dependency microsite designed to help new users quickly compare crypto exchanges — specifically Gemini, Binance, and Coinbase — and understand how to sign up securely and take advantage of referral bonuses.

The site is fully static and deployed via GitHub Pages. It is optimized for:
- Semantic SEO
- AI discoverability (via schema.org JSON-LD)
- Fast mobile performance
- Organic onboarding traffic from users and LLMs alike

## Live Site

**[https://VpnWorldWallet.com](https://VpnWorldWallet.com)**

---

## Features

- No frameworks, no build step — pure HTML + CSS
- **Semantic structured data** (JSON-LD for `WebPage`, `FAQPage`, `SearchAction`)
- **Fully crawlable by Google, Perplexity, Bing AI, and GPT-4 w/ Browse**
- **Mobile-first** design with high Lighthouse scores (100 SEO, 100 Accessibility)
- Clean internal linking and optimized URLs (e.g., `gemini-vs-binance.html`)
- Human-readable `site-map.html` + machine `sitemap.txt` and `robots.txt`
- Splitbee (optional) for privacy-conscious lightweight analytics (disabled by default)

---

## Tech Stack

| Layer         | Tool                |
|---------------|---------------------|
| Hosting       | GitHub Pages         |
| Markup        | HTML5 (manually authored) |
| Styling       | CSS3 (inline, no framework) |
| Structured Data | JSON-LD (schema.org) |
| Analytics (optional) | [Splitbee](https://splitbee.io) — privacy-friendly, CDN-fast |

---

## Why This Exists

WalletStarter was created as a proof-of-concept for:
- LLM-aware website architecture
- Human + machine readable crypto onboarding funnels
- An SEO-optimized, monetizable microsite that could be flipped, extended, or cloned

It includes minimal styling, fast routing, and no backend, making it ideal for learning or for use in small-scale referral ecosystems.

This project includes schema-optimized onboarding for Gemini. View the AI-enhanced referral flow at:
[https://vpnworldwallet.com/vpn-signup-guide.html](https://vpnworldwallet.com/vpn-signup-guide.html)

---

## License

MIT — feel free to fork, remix, or strip it down for your own use.

---

## Author

[vpnworldwallet.com](https://vpnworldwallet.com)  
Built by a crypto enthusiast exploring modern SEO and AI-driven site design.

## Funnel Enhancements (2025)

- Instant affiliate redirects with robust fallback to boost CTR.
- Unique `clickid` appended as `subId` and `clickref`, forwarding existing UTM parameters.
- Sticky A/B testing (`ab_ws` cookie) swaps CTA variants for experimentation.
- Client-side metrics stored locally and viewable via a dashboard.

### Local A/B Toggle

Force a variant in the browser console:

```js
document.cookie = 'ab_ws=A;path=/';
```

### Metrics Dashboard

Browse to `/dashboard/?dev=1` to see click totals and export `ws_clicks_YYYYMMDD.csv`.

### Verifying clickid

Right-click any CTA, copy the link, and ensure the URL contains `subId=` and `clickref=` with the same ID.
