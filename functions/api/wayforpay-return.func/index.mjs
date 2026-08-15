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

function env(name) {
  return process.env[name] || "";
}

function valueOf(payload, ...names) {
  for (const name of names) {
    if (payload[name] !== undefined && payload[name] !== null && payload[name] !== "") {
      return payload[name];
    }
  }
  return "";
}

function normalizePayload(payload) {
  const orderReference = valueOf(payload, "orderReference", "ORDERREFERENCE");
  const telegramIdFromOrder = String(orderReference).match(/KVITKA-TG(\d+)-/)?.[1] || "";

  return {
    orderReference,
    transactionId: valueOf(payload, "transactionId", "TRANSACTIONID"),
    invoiceId: valueOf(payload, "invoiceId", "INVOICEID"),
    amount: valueOf(payload, "amount", "AMOUNT"),
    currency: valueOf(payload, "currency", "CURRENCY") || "UAH",
    transactionStatus: valueOf(payload, "transactionStatus", "TRANSACTIONSTATUS") || "Approved",
    paymentSystem: valueOf(payload, "paymentSystem", "PAYMENTSYSTEM") || "WayForPay",
    clientName: valueOf(payload, "clientName", "CLIENTNAME"),
    telegramId: valueOf(payload, "telegramId", "TELEGRAMID") || telegramIdFromOrder,
    processingDate: valueOf(payload, "processingDate", "PROCESSINGDATE"),
    createdDate: valueOf(payload, "createdDate", "CREATEDDATE"),
    reason: valueOf(payload, "reason", "REASON"),
    reasonCode: valueOf(payload, "reasonCode", "REASONCODE"),
    email: valueOf(payload, "email", "EMAIL"),
    phone: valueOf(payload, "phone", "PHONE")
  };
}

function secondsToIso(seconds) {
  const numeric = Number(seconds);
  if (!Number.isFinite(numeric) || numeric <= 0) return "";
  return new Date(numeric * 1000).toISOString();
}

function paymentStatusLabel(status) {
  if (status === "Approved") return "Оплачено";
  if (status === "Declined") return "Не оплачено";
  if (status === "Refunded") return "Повернення";
  if (status === "InProcessing") return "В обробці";
  return status || "Оплачено";
}

function paymentView(payload) {
  const payment = normalizePayload(payload);
  const status = payment.transactionStatus || "Approved";
  if (status === "Declined") {
    return {
      title: "Оплату не завершено",
      text: "Платіж не пройшов. Можливо, на картці недостатньо коштів або банк відхилив операцію. Можна спробувати ще раз або написати Наталії.",
      mark: "!",
      tone: "#a33b21",
      status
    };
  }
  if (status === "InProcessing") {
    return {
      title: "Платіж в обробці",
      text: "WayForPay ще обробляє платіж. Наталія побачить статус у таблиці, коли банк підтвердить операцію.",
      mark: "...",
      tone: "#b8821d",
      status
    };
  }
  return {
    title: "Оплату прийнято",
    text: "Дякую. Платіж пройшов успішно. Наталія побачить оплату й зможе написати вам щодо наступного кроку.",
    mark: "✓",
    tone: "#1f671f",
    status
  };
}

async function sendPaymentToSheets(payload) {
  const payment = normalizePayload(payload);
  if (!payment.orderReference) return;

  await sendCrmEvent("payment.returned", {
    type: "payment",
    created_at: new Date().toISOString(),
    order_reference: payment.orderReference,
    wayforpay_transaction_id: payment.transactionId || payment.invoiceId || payment.orderReference,
    amount: String(payment.amount || ""),
    currency: payment.currency,
    payment_status: paymentStatusLabel(payment.transactionStatus),
    payment_method: payment.paymentSystem,
    service: "Тестова оплата KVITKA space",
    client_name: payment.clientName || payment.email || payment.phone || "",
    telegram_id: payment.telegramId || "",
    paid_at: secondsToIso(payment.processingDate || payment.createdDate) || new Date().toISOString(),
    comment: payment.reason || payment.reasonCode || "return-url"
  });
}

async function sendCrmEvent(event, data) {
  const makeWebhookUrl = env("MAKE_WEBHOOK_URL") || env("CRM_WEBHOOK_URL");
  if (makeWebhookUrl) {
    await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event,
        source: "vercel_wayforpay",
        sent_at: new Date().toISOString(),
        data
      })
    });
    return;
  }

  const webhookUrl =
    env("GOOGLE_SHEETS_WEBHOOK_URL") ||
    "https://script.google.com/macros/s/AKfycbxmDfxznd3lRIFKVDMfFtjf382RdAWEolFNJ_YHqX952DXTe9g9cShALyfVp-fLEa6A/exec";
  const url = new URL(webhookUrl);
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  await fetch(url, { method: "GET" });
}

function successPage(payload) {
  const view = paymentView(payload);
  const orderReference = escapeHtml(payload.orderReference || payload.ORDERREFERENCE || "");
  const amount = escapeHtml(payload.amount || payload.AMOUNT || "");
  const currency = escapeHtml(payload.currency || payload.CURRENCY || "UAH");

  return `<!doctype html>
    <html lang="uk">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(view.title)} | KVITKA space</title>
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
            background: ${view.tone};
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
          <div class="mark">${escapeHtml(view.mark)}</div>
          <h1>${escapeHtml(view.title)}</h1>
          <p>${escapeHtml(view.text)}</p>
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

  try {
    await sendPaymentToSheets(payload);
  } catch (error) {
    console.error("Could not write WayForPay return payment to Google Sheets", error);
  }

  response.statusCode = 200;
  response.setHeader("content-type", "text/html; charset=utf-8");
  response.end(successPage(payload));
}
