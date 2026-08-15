import crypto from "node:crypto";

const SHEETS_WEBHOOK_FALLBACK =
  "https://script.google.com/macros/s/AKfycbxmDfxznd3lRIFKVDMfFtjf382RdAWEolFNJ_YHqX952DXTe9g9cShALyfVp-fLEa6A/exec";

function env(name) {
  return process.env[name] || "";
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
  const parsed = Object.fromEntries(params.entries());
  if (Object.keys(parsed).length) return parsed;

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
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
    merchantAccount: valueOf(payload, "merchantAccount", "MERCHANTACCOUNT"),
    orderReference,
    transactionId: valueOf(payload, "transactionId", "TRANSACTIONID"),
    invoiceId: valueOf(payload, "invoiceId", "INVOICEID"),
    amount: valueOf(payload, "amount", "AMOUNT"),
    currency: valueOf(payload, "currency", "CURRENCY") || "UAH",
    transactionStatus: valueOf(payload, "transactionStatus", "TRANSACTIONSTATUS"),
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

function hmacMd5(secretKey, value) {
  return crypto.createHmac("md5", secretKey).update(value, "utf8").digest("hex");
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
  return status || "Очікує підтвердження";
}

async function sendPaymentToSheets(payload) {
  const payment = normalizePayload(payload);
  if (!payment.orderReference) return;

  await sendCrmEvent("payment.updated", {
    type: "payment",
    created_at: new Date().toISOString(),
    order_reference: payment.orderReference,
    wayforpay_transaction_id: payment.transactionId || payment.invoiceId || "",
    amount: String(payment.amount || ""),
    currency: payment.currency,
    payment_status: paymentStatusLabel(payment.transactionStatus),
    payment_method: payment.paymentSystem,
    service: "Тестова оплата KVITKA space",
    client_name: payment.clientName || payment.email || payment.phone || "",
    telegram_id: payment.telegramId || "",
    paid_at: secondsToIso(payment.processingDate || payment.createdDate),
    comment: payment.reason || payment.reasonCode || ""
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

  const url = new URL(env("GOOGLE_SHEETS_WEBHOOK_URL") || SHEETS_WEBHOOK_FALLBACK);
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  await fetch(url, { method: "GET" });
}

export default async function handler(request, response) {
  const secretKey = env("WAYFORPAY_SECRET_KEY");
  const rawBody = await readBody(request);
  const payload = parsePayload(request, rawBody);
  const payment = normalizePayload(payload);
  const orderReference = payment.orderReference || "";
  const status = "accept";
  const time = Math.floor(Date.now() / 1000);
  const signature = secretKey ? hmacMd5(secretKey, [orderReference, status, time].join(";")) : "";

  try {
    await sendPaymentToSheets(payload);
  } catch (error) {
    console.error("Could not write WayForPay payment to Google Sheets", error);
  }

  response.statusCode = 200;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.end(JSON.stringify(orderReference ? { orderReference, status, time, signature } : { ok: true }));
}
