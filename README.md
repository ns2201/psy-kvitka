# KVITKA space Telegram Mini App

Static Telegram Mini App for Наталія Квітка.

## Local preview

Open `index.html` in a browser or run a small static server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Vercel

This folder is Vercel-ready as a static project.

Recommended Vercel settings:

- Framework preset: Other
- Build command: empty
- Output directory: `.`
- Install command: empty

After deployment, use the Vercel HTTPS URL as `KVITKA_MINI_APP_URL` for the Telegram bot.
