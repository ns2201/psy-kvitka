import crypto from "node:crypto";

function env(name) {
  return process.env[name] || "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function hidden(name, value) {
  if (Array.isArray(value)) {
    return value.map((item) => hidden(`${name}[]`, item)).join("");
  }
  return `<input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(value)}" />`;
}

async function createPendingPayment({ orderReference, amount, currency, telegramId }) {
  const webhookUrl =
    env("GOOGLE_SHEETS_WEBHOOK_URL") ||
    "https://script.google.com/macros/s/AKfycbxmDfxznd3lRIFKVDMfFtjf382RdAWEolFNJ_YHqX952DXTe9g9cShALyfVp-fLEa6A/exec";
  if (!webhookUrl) return;

  const url = new URL(webhookUrl);
  url.searchParams.set("type", "payment");
  url.searchParams.set("created_at", new Date().toISOString());
  url.searchParams.set("order_reference", orderReference);
  url.searchParams.set("wayforpay_transaction_id", "");
  url.searchParams.set("amount", amount);
  url.searchParams.set("currency", currency);
  url.searchParams.set("payment_status", "Очікує оплату");
  url.searchParams.set("payment_method", "WayForPay");
  url.searchParams.set("service", "Тестова оплата KVITKA space");
  url.searchParams.set("telegram_id", telegramId || "");
  url.searchParams.set("paid_at", "");
  url.searchParams.set("comment", "Створено посилання на оплату");

  await fetch(url, { method: "GET" });
}

export default async function handler(request, response) {
  const merchantAccount = env("WAYFORPAY_MERCHANT_ACCOUNT");
  const merchantDomainName = env("WAYFORPAY_MERCHANT_DOMAIN") || "psy-kvitka.vercel.app";
  const secretKey = env("WAYFORPAY_SECRET_KEY");
  const returnUrl = env("WAYFORPAY_RETURN_URL") || "https://psy-kvitka.vercel.app/api/wayforpay-return";
  const serviceUrl = env("WAYFORPAY_SERVICE_URL") || "https://psy-kvitka.vercel.app/api/wayforpay-callback";
  const query = new URL(request.url, `https://${merchantDomainName}`).searchParams;
  const telegramId = String(query.get("telegram_id") || "").replace(/\D/g, "");

  if (!merchantAccount || !secretKey) {
    response.statusCode = 500;
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(`<!doctype html>
      <html lang="uk">
        <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>WayForPay setup</title></head>
        <body style="font-family:system-ui;padding:24px;line-height:1.45">
          <h1>WayForPay ще не підключено</h1>
          <p>Додайте у Vercel Environment Variables:</p>
          <ul>
            <li>WAYFORPAY_MERCHANT_ACCOUNT</li>
            <li>WAYFORPAY_SECRET_KEY</li>
            <li>WAYFORPAY_MERCHANT_DOMAIN</li>
          </ul>
        </body>
      </html>`);
    return;
  }

  const orderReference = telegramId ? `KVITKA-TG${telegramId}-${Date.now()}` : `KVITKA-TEST-${Date.now()}`;
  const orderDate = Math.floor(Date.now() / 1000);
  const amount = "1";
  const currency = "UAH";
  const productName = ["Тестова оплата KVITKA space"];
  const productCount = ["1"];
  const productPrice = ["1"];

  try {
    await createPendingPayment({ orderReference, amount, currency, telegramId });
  } catch (error) {
    console.error("Could not create pending WayForPay payment", error);
  }

  const signatureBase = [
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    currency,
    ...productName,
    ...productCount,
    ...productPrice
  ].join(";");

  const merchantSignature = crypto
    .createHmac("md5", secretKey)
    .update(signatureBase, "utf8")
    .digest("hex");

  const fields = {
    merchantAccount,
    merchantDomainName,
    merchantTransactionSecureType: "AUTO",
    merchantSignature,
    orderReference,
    orderDate,
    amount,
    currency,
    productName,
    productCount,
    productPrice,
    language: "UA",
    returnUrl,
    serviceUrl
  };

  response.statusCode = 200;
  response.setHeader("content-type", "text/html; charset=utf-8");
  response.end(`<!doctype html>
    <html lang="uk">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Тестова оплата KVITKA space</title>
      </head>
      <body style="font-family:system-ui;display:grid;min-height:100vh;place-items:center;margin:0;background:#eeeae3;color:#111">
        <main style="width:min(420px,calc(100% - 32px));border-radius:16px;padding:24px;background:#fff">
          <h1 style="margin:0 0 10px">Тестова оплата 1 грн</h1>
          <p style="color:#666;line-height:1.45">Зараз відкриється захищена сторінка WayForPay.</p>
          <form id="pay" method="post" action="https://secure.wayforpay.com/pay">
            ${Object.entries(fields).map(([name, value]) => hidden(name, value)).join("")}
            <button style="width:100%;min-height:48px;border:0;border-radius:10px;background:#1f671f;color:#fff;font-weight:800" type="submit">Перейти до оплати</button>
          </form>
        </main>
        <script>setTimeout(() => document.getElementById("pay").submit(), 500);</script>
      </body>
    </html>`);
}
