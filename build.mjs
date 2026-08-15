import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm(".vercel/output", { recursive: true, force: true });
await mkdir(".vercel/output/static/public", { recursive: true });

await cp("index.html", ".vercel/output/static/index.html");
await cp("styles.css", ".vercel/output/static/styles.css");
await cp("app.js", ".vercel/output/static/app.js");
await cp("public/kvitka", ".vercel/output/static/public/kvitka", { recursive: true });

await writeFile(
  ".vercel/output/config.json",
  JSON.stringify(
    {
      version: 3,
      routes: [
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
