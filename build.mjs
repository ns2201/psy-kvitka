import { cp, mkdir, rm, writeFile } from "node:fs/promises";

// Demo build: no payment functions are deployed. The WayForPay source
// under functions/api/ stays in the repo for a later production phase,
// but is intentionally excluded from .vercel/output here.
await rm(".vercel/output", { recursive: true, force: true });
await mkdir(".vercel/output/static/public", { recursive: true });

await cp("index.html", ".vercel/output/static/index.html");
await cp("styles.css", ".vercel/output/static/styles.css");
await cp("app.js", ".vercel/output/static/app.js");
await cp("landing.html", ".vercel/output/static/landing.html");
await cp("landing.css", ".vercel/output/static/landing.css");
await cp("public/kvitka", ".vercel/output/static/public/kvitka", { recursive: true });

await writeFile(
  ".vercel/output/config.json",
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "/landing/?",
          dest: "/landing.html"
        },
        {
          handle: "filesystem"
        },
        {
          src: "/.*",
          dest: "/index.html"
        }
      ]
    },
    null,
    2
  )
);
