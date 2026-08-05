/**
 * OPTIONAL UPGRADE — not active until you configure it.
 *
 * Cloudflare Pages Function that replaces Formspree with a fully
 * Cloudflare-native lead pipeline:
 *   form POST -> this function -> Turnstile spam check -> Resend email
 *   (internal alert to you + confirmation to the prospect)
 *
 * TO ACTIVATE:
 * 1. Create a free Resend account (resend.com), verify your domain,
 *    and get an API key.
 * 2. In Cloudflare Pages -> Settings -> Environment variables, add:
 *      RESEND_API_KEY        = your Resend key
 *      LEAD_TO_EMAIL         = al.eagleeyes@gmail.com
 *      TURNSTILE_SECRET_KEY  = (optional) from Cloudflare Turnstile
 * 3. Change the contact form action to "/api/lead" and, if using
 *    Turnstile, add its widget to the form.
 * Until then, the site keeps using the working Formspree endpoint.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  if (!env.RESEND_API_KEY || !env.LEAD_TO_EMAIL) {
    return json({ ok: false, error: "Lead endpoint not configured." }, 503);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid form submission." }, 400);
  }

  // Honeypot: bots fill the hidden "website" field.
  if (form.get("website")) {
    return json({ ok: true }); // pretend success, drop silently
  }

  const name = (form.get("name") || "").toString().trim();
  const company = (form.get("company") || "").toString().trim();
  const phone = (form.get("phone") || "").toString().trim();
  const email = (form.get("email") || "").toString().trim();
  const message = (form.get("message") || "").toString().trim();

  if (!name || !company || !phone || !message) {
    return json({ ok: false, error: "Missing required fields." }, 400);
  }

  // Optional Turnstile verification (only if the secret is configured).
  if (env.TURNSTILE_SECRET_KEY) {
    const token = form.get("cf-turnstile-response");
    if (!token) return json({ ok: false, error: "Spam check failed." }, 403);
    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token.toString(),
          remoteip: request.headers.get("CF-Connecting-IP") || "",
        }),
      }
    ).then((r) => r.json());
    if (!verify.success) {
      return json({ ok: false, error: "Spam check failed." }, 403);
    }
  }

  const sendEmail = (payload) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  // 1. Internal alert to Axonix.
  const alertRes = await sendEmail({
    from: "Axonix Website <leads@axonixintegrated.com>",
    to: [env.LEAD_TO_EMAIL],
    reply_to: email || undefined,
    subject: `New Axonix Lead: ${company} (${name})`,
    text: [
      `Name: ${name}`,
      `Company/Facility: ${company}`,
      `Phone: ${phone}`,
      `Email: ${email || "(not provided)"}`,
      ``,
      `Project details:`,
      message,
      ``,
      `Submitted: ${new Date().toISOString()}`,
      `Page: ${request.headers.get("Referer") || "unknown"}`,
    ].join("\n"),
  });

  if (!alertRes.ok) {
    return json({ ok: false, error: "Could not deliver your request." }, 502);
  }

  // 2. Confirmation to the prospect (only if they gave an email).
  if (email) {
    await sendEmail({
      from: "Axonix Integrated Technologies <leads@axonixintegrated.com>",
      to: [email],
      subject: "We received your Axonix assessment request",
      text: [
        `Hi ${name},`,
        ``,
        `Thank you for contacting Axonix Integrated Technologies. We received your request and will review the details you provided. A member of our team will contact you within one business day.`,
        ``,
        `For urgent project questions, call or text 586-339-5370.`,
        ``,
        `Axonix Integrated Technologies`,
        `Commercial security & low-voltage systems — Metro Detroit`,
        `https://axonixintegrated.com`,
      ].join("\n"),
    }).catch(() => {}); // confirmation failure shouldn't fail the lead
  }

  return json({ ok: true });
}
