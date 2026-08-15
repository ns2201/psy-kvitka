function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

function parsePayload(request, rawBody) {
  if (!rawBody) return {};
  const contentType = String(request.headers["content-type"] || "");

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(rawBody);
    } catch {
      return {};
    }
  }

  const params = new URLSearchParams(rawBody);
  return Object.fromEntries(params.entries());
}

function successPage(payload) {
  const orderReference = escapeHtml(payload.orderReference || payload.ORDERREFERENCE || "");
  const amount = escapeHtml(payload.amount || payload.AMOUNT || "");
  const currency = escapeHtml(payload.currency || payload.CURRENCY || "UAH");

  return `<!doctype html>
    <html lang="uk">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Оплату прийнято | KVITKA space</title>
        <style>
          :root { color-scheme: light; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 22px;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #eeeae3;
            color: #141411;
          }
          main {
            width: min(460px, 100%);
            border-radius: 18px;
            padding: 26px;
            background: #fffaf2;
            box-shadow: 0 18px 55px rgba(24, 36, 18, .12);
          }
          .mark {
            width: 54px;
            height: 54px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            margin-bottom: 18px;
            background: #1f671f;
            color: white;
            font-size: 30px;
            font-weight: 900;
          }
          h1 {
            margin: 0 0 10px;
            font-size: clamp(30px, 9vw, 44px);
            line-height: .96;
            letter-spacing: 0;
          }
          p {
            margin: 0 0 18px;
            color: #5e5b54;
            line-height: 1.5;
            font-size: 16px;
          }
          .details {
            display: grid;
            gap: 8px;
            margin: 20px 0;
            padding: 14px;
            border: 1px solid #e5ded2;
            border-radius: 12px;
            background: #fbf6ee;
            color: #302d29;
          }
          .row {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            font-size: 14px;
          }
          .row span:first-child { color: #777168; }
          .row span:last-child { text-align: right; font-weight: 700; word-break: break-word; }
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 48px;
            margin-top: 10px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 800;
          }
          .primary { background: #1f671f; color: #fff; }
          .secondary { border: 1px solid #d9d0c4; color: #1f671f; background: #fff; }
        </style>
      </head>
      <body>
        <main>
          <div class="mark">✓</div>
          <h1>Оплату прийнято</h1>
          <p>Дякую. Платіж пройшов успішно. Наталія побачить оплату й зможе написати вам щодо наступного кроку.</p>
          <div class="details">
            ${orderReference ? `<div class="row"><span>Номер</span><span>${orderReference}</span></div>` : ""}
            ${amount ? `<div class="row"><span>Сума</span><span>${amount} ${currency}</span></div>` : ""}
          </div>
          <a class="primary" href="https://t.me/psy_sava_bot">Повернутися в Telegram</a>
          <a class="secondary" href="https://t.me/nastia_savanzha">Написати Наталії</a>
        </main>
      </body>
    </html>`;
}

export default async function handler(request, response) {
  const rawBody = request.method === "POST" ? await readBody(request) : "";
  const query = new URL(request.url, "https://psy-kvitka.vercel.app").searchParams;
  const payload = {
    ...Object.fromEntries(query.entries()),
    ...parsePayload(request, rawBody)
  };

  response.statusCode = 200;
  response.setHeader("content-type", "text/html; charset=utf-8");
  response.end(successPage(payload));
}
