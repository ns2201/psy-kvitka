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
  const webhookUrl = env("GOOGLE_SHEETS_WEBHOOK_URL") || SHEETS_WEBHOOK_FALLBACK;
  if (!webhookUrl) return;
  if (!payload.orderReference) return;

  const url = new URL(webhookUrl);
  url.searchParams.set("type", "payment");
  url.searchParams.set("created_at", new Date().toISOString());
  url.searchParams.set("order_reference", payload.orderReference || "");
  url.searchParams.set("wayforpay_transaction_id", payload.transactionId || payload.invoiceId || "");
  url.searchParams.set("amount", String(payload.amount || ""));
  url.searchParams.set("currency", payload.currency || "UAH");
  url.searchParams.set("payment_status", paymentStatusLabel(payload.transactionStatus));
  url.searchParams.set("payment_method", payload.paymentSystem || "WayForPay");
  url.searchParams.set("service", "Тестова оплата KVITKA space");
  url.searchParams.set("client_name", payload.clientName || payload.email || payload.phone || "");
  url.searchParams.set("telegram_id", payload.telegramId || "");
  url.searchParams.set("paid_at", secondsToIso(payload.processingDate || payload.createdDate));
  url.searchParams.set("comment", payload.reason || payload.reasonCode || "");

  await fetch(url, { method: "GET" });
}

export default async function handler(request, response) {
  const secretKey = env("WAYFORPAY_SECRET_KEY");
  const rawBody = await readBody(request);
  const payload = parsePayload(request, rawBody);
  const orderReference = payload.orderReference || "";
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
