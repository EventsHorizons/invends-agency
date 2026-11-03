import { createError, defineEventHandler, getRequestIP, readBody } from "h3";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-()]{7,20}$/;
const MAX_LEN = {
  firstName: 80,
  lastName: 80,
  company: 120,
  email: 160,
  phone: 40,
  source: 200,
  message: 4000,
  budget: 80,
  service: 80,
} as const;

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

type ContactBody = {
  firstName?: unknown;
  lastName?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  source?: unknown;
  message?: unknown;
  budget?: unknown;
  services?: unknown;
  consent?: unknown;
  website?: unknown;
  locale?: unknown;
};

function str(value: unknown, max: number): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_MAX) return false;
  bucket.count += 1;
  return true;
}

export default defineEventHandler(async (event) => {
  const ip =
    getRequestIP(event, { xForwardedFor: true }) ||
    event.node.req.socket.remoteAddress ||
    "unknown";

  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too many requests. Try again later.",
    });
  }

  const body = (await readBody(event)) as ContactBody;

  // Honeypot — bots fill this; humans never see it
  if (str(body.website, 200)) {
    return { ok: true };
  }

  const firstName = str(body.firstName, MAX_LEN.firstName);
  const lastName = str(body.lastName, MAX_LEN.lastName);
  const company = str(body.company, MAX_LEN.company);
  const email = str(body.email, MAX_LEN.email);
  const phone = str(body.phone, MAX_LEN.phone);
  const source = str(body.source, MAX_LEN.source);
  const message = str(body.message, MAX_LEN.message);
  const budget = str(body.budget, MAX_LEN.budget);
  const locale = str(body.locale, 8) === "en" ? "en" : "es";
  const consent = body.consent === true;
  const services = Array.isArray(body.services)
    ? body.services
        .map((s) => str(s, MAX_LEN.service))
        .filter(Boolean)
        .slice(0, 20)
    : [];

  const fieldErrors: string[] = [];
  if (!firstName) fieldErrors.push("firstName");
  if (!lastName) fieldErrors.push("lastName");
  if (!company) fieldErrors.push("company");
  if (!email || !EMAIL_RE.test(email)) fieldErrors.push("email");
  if (!phone || !PHONE_RE.test(phone)) fieldErrors.push("phone");
  if (!budget) fieldErrors.push("budget");
  if (services.length === 0) fieldErrors.push("services");
  if (!consent) fieldErrors.push("consent");

  if (fieldErrors.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
      data: { fields: fieldErrors },
    });
  }

  const config = useRuntimeConfig(event);
  const apiKey = String(config.resendApiKey || "").trim();
  const contactTo = String(config.contactTo || "").trim();
  const contactFrom = String(config.contactFrom || "").trim();

  if (!apiKey || !contactTo || !contactFrom) {
    throw createError({
      statusCode: 503,
      statusMessage: "Contact service is not configured.",
    });
  }

  const subject = `[Invends] Contacto — ${firstName} ${lastName} (${company})`;
  const servicesLine = services.join(", ");
  const text = [
    `Nombre: ${firstName} ${lastName}`,
    `Compañía: ${company}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    `Servicios: ${servicesLine}`,
    `Modalidad: ${budget}`,
    `Cómo nos conocieron: ${source || "—"}`,
    `Idioma: ${locale}`,
    "",
    "Mensaje:",
    message || "—",
  ].join("\n");

  const html = `
    <h2>Nuevo mensaje de contacto — Invends</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(`${firstName} ${lastName}`)}</p>
    <p><strong>Compañía:</strong> ${escapeHtml(company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Servicios:</strong> ${escapeHtml(servicesLine)}</p>
    <p><strong>Modalidad:</strong> ${escapeHtml(budget)}</p>
    <p><strong>Cómo nos conocieron:</strong> ${escapeHtml(source || "—")}</p>
    <p><strong>Idioma:</strong> ${escapeHtml(locale)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message || "—").replaceAll("\n", "<br/>")}</p>
  `;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactTo],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "Unable to reach mail provider.",
    });
  }

  if (!res.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: "Mail provider rejected the message.",
    });
  }

  return { ok: true };
});
