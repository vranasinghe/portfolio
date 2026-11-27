// Branded HTML emails for the contact form, styled after the portfolio:
// Inter, ink #0b1222, accent blue #1f56f0, black bands #04060b, square
// corners, 2px rules, heavy uppercase headlines and tracked uppercase labels.
// Table layout + inline styles so they render in Gmail, Outlook and Apple Mail.

import { personalInfo } from "@/data/portfolio";

const SITE_URL = "https://venuja.online";
const SITE_LABEL = "venuja.online";

const C = {
  ink: "#0b1222",
  black: "#04060b",
  blue: "#1f56f0",
  blueLight: "#6b93ff",
  paper: "#fbfcfe",
  tint: "#f3f7ff",
  tint2: "#e6eeff",
  line: "#dde3ee",
  muted: "#5f6b7e",
  body: "#4a5568",
  white: "#ffffff",
};

const FONT = "Inter, 'Segoe UI', Helvetica, Arial, sans-serif";

export type ContactEmailData = {
  name: string;
  email: string;
  message: string;
  referenceId: string;
  receivedAt: Date;
};

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const multiline = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br>");

export function makeReferenceId() {
  const rand = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(16).slice(2) + Date.now().toString(16);
  return `VR-MSG-${rand.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export function formatReceived(d: Date) {
  const s = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Colombo",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
  return `${s} (Sri Lanka time)`;
}

/* ── building blocks ─────────────────────────────────────── */

const label = (text: string, color: string = C.muted) =>
  `<div style="font-family:${FONT};font-size:11px;line-height:16px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:${color};">${text}</div>`;

const detailRows = (rows: [string, string][]) =>
  rows
    .map(
      ([k, v], i) => `
      <tr>
        <td valign="top" style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ""}width:150px;font-family:${FONT};font-size:14px;line-height:20px;font-weight:600;color:${C.muted};">${k}</td>
        <td valign="top" style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${FONT};font-size:14px;line-height:20px;color:${C.ink};">${v}</td>
      </tr>`
    )
    .join("");

const callout = (strong: string, rest: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.tint};border:2px solid ${C.blue};">
    <tr><td style="padding:16px 20px;font-family:${FONT};font-size:15px;line-height:23px;color:${C.ink};">
      <strong style="color:${C.blue};">${strong}</strong> ${rest}
    </td></tr>
  </table>`;

const messageBox = (title: string, message: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid ${C.ink};">
    <tr><td style="padding:12px 20px;background:${C.ink};">${label(title, C.white)}</td></tr>
    <tr><td style="padding:20px;font-family:${FONT};font-size:15px;line-height:24px;color:${C.ink};background:${C.white};">${multiline(message)}</td></tr>
  </table>`;

const button = (href: string, text: string, bg: string = C.blue) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="background:${bg};">
      <a href="${href}" style="display:inline-block;padding:15px 28px;font-family:${FONT};font-size:14px;line-height:18px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:${C.white};text-decoration:none;">${text} &rarr;</a>
    </td></tr>
  </table>`;

const note = (html: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid ${C.ink};">
    <tr><td style="padding:16px 0 0;font-family:${FONT};font-size:14px;line-height:22px;color:${C.body};">${html}</td></tr>
  </table>`;

const spacer = (h: number) => `<tr><td style="height:${h}px;line-height:${h}px;font-size:0;">&nbsp;</td></tr>`;

const footer = () => {
  const link = (href: string, text: string) =>
    `<a href="${href}" style="color:${C.blueLight};text-decoration:none;font-weight:600;">${text}</a>`;
  return `
  <tr><td style="background:${C.black};padding:28px 40px;" class="px">
    <div style="font-family:${FONT};font-size:18px;line-height:22px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;color:${C.white};">${escapeHtml(personalInfo.name)}</div>
    <div style="font-family:${FONT};font-size:13px;line-height:20px;color:rgba(255,255,255,0.62);padding-top:4px;">${escapeHtml(personalInfo.title)} &middot; ${escapeHtml(personalInfo.location)}</div>
    <div style="font-family:${FONT};font-size:13px;line-height:20px;padding-top:14px;">
      ${link(SITE_URL, SITE_LABEL)}
      <span style="color:rgba(255,255,255,0.35);">&nbsp;&middot;&nbsp;</span>${link(personalInfo.linkedin, "LinkedIn")}
      <span style="color:rgba(255,255,255,0.35);">&nbsp;&middot;&nbsp;</span>${link(personalInfo.github, "GitHub")}
      <span style="color:rgba(255,255,255,0.35);">&nbsp;&middot;&nbsp;</span>${link(`mailto:${personalInfo.email}`, escapeHtml(personalInfo.email))}
    </div>
  </td></tr>`;
};

const shell = (opts: { title: string; preheader: string; header: string; body: string }) => `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(opts.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; background:${C.tint2}; }
  a { color:${C.blue}; }
  @media (max-width:620px) {
    .container { width:100% !important; }
    .px { padding-left:22px !important; padding-right:22px !important; }
    .h1 { font-size:30px !important; line-height:32px !important; }
    .stack td { display:block !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.tint2};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(opts.preheader)}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.tint2};">
    <tr><td align="center" style="padding:32px 12px;">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${C.white};border:2px solid ${C.ink};">
        ${opts.header}
        <tr><td class="px" style="padding:36px 40px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${opts.body}
          </table>
        </td></tr>
        ${footer()}
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const header = (opts: { bg: string; eyebrow: string; eyebrowColor: string; headline: string; accentWord?: string; accentColor?: string }) => `
  <tr><td class="px" style="background:${opts.bg};padding:34px 40px 30px;">
    ${label(opts.eyebrow, opts.eyebrowColor)}
    <div class="h1" style="font-family:${FONT};font-size:38px;line-height:38px;font-weight:900;letter-spacing:-1.6px;text-transform:uppercase;color:${C.white};padding-top:14px;">
      ${opts.headline}${opts.accentWord ? ` <span style="color:${opts.accentColor};">${opts.accentWord}</span>` : ""}
    </div>
  </td></tr>
  <tr><td style="height:6px;line-height:6px;font-size:0;background:${opts.bg === C.blue ? C.black : C.blue};">&nbsp;</td></tr>`;

/* ── 1. Alert to the site owner ──────────────────────────── */

export function ownerNotificationEmail(d: ContactEmailData) {
  const name = escapeHtml(d.name);
  const email = escapeHtml(d.email);
  const received = escapeHtml(formatReceived(d.receivedAt));
  const replyHref = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent(`Re: your message on ${SITE_LABEL}`)}`;

  const html = shell({
    title: `New message from ${d.name}`,
    preheader: `${d.name} sent you a message: ${d.message.slice(0, 90)}`,
    header: header({
      bg: C.black,
      eyebrow: `Portfolio &middot; Inbound message`,
      eyebrowColor: C.blueLight,
      headline: "New message",
      accentWord: "received.",
      accentColor: C.blueLight,
    }),
    body: `
      <tr><td style="font-family:${FONT};font-size:22px;line-height:28px;font-weight:800;letter-spacing:-0.4px;color:${C.ink};">
        ${name} wants to connect
      </td></tr>
      ${spacer(18)}
      <tr><td>${callout("Action required:", "read the message below and reply within 24 hours &mdash; that&rsquo;s the promise on your contact page.")}</td></tr>
      ${spacer(26)}
      <tr><td>${label("Details")}</td></tr>
      ${spacer(6)}
      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack">
          ${detailRows([
            ["Reference", `<span style="font-family:Consolas,'Courier New',monospace;font-weight:700;color:${C.blue};">${escapeHtml(d.referenceId)}</span>`],
            ["Received", received],
            ["Name", `<strong>${name}</strong>`],
            ["Email", `<a href="mailto:${email}" style="color:${C.blue};font-weight:600;">${email}</a>`],
            ["Source", `Contact form &middot; <a href="${SITE_URL}/#contact" style="color:${C.ink};">${SITE_LABEL}</a>`],
          ])}
        </table>
      </td></tr>
      ${spacer(26)}
      <tr><td>${messageBox("Message", d.message)}</td></tr>
      ${spacer(28)}
      <tr><td>${button(replyHref, `Reply to ${name}`)}</td></tr>
      ${spacer(28)}
      <tr><td>${note(`Hitting <strong style="color:${C.ink};">reply</strong> on this email goes straight to ${name}. They&rsquo;ve also been sent a confirmation with reference <strong style="color:${C.ink};">${escapeHtml(d.referenceId)}</strong>.`)}</td></tr>
    `,
  });

  const text = [
    `NEW MESSAGE RECEIVED — ${SITE_LABEL}`,
    ``,
    `Action required: reply within 24 hours.`,
    ``,
    `Reference: ${d.referenceId}`,
    `Received:  ${formatReceived(d.receivedAt)}`,
    `Name:      ${d.name}`,
    `Email:     ${d.email}`,
    ``,
    `Message:`,
    d.message,
    ``,
    `Reply to this email to respond directly to ${d.name}.`,
  ].join("\n");

  return { subject: `New message from ${d.name} · ${d.referenceId}`, html, text };
}

/* ── 2. Confirmation to the visitor ──────────────────────── */

export function visitorConfirmationEmail(d: ContactEmailData) {
  const name = escapeHtml(d.name);
  const first = escapeHtml(d.name.split(/\s+/)[0] || d.name);
  const email = escapeHtml(d.email);
  const received = escapeHtml(formatReceived(d.receivedAt));

  const linkRow = (href: string, title: string, sub: string, first = false) => `
    <tr><td style="padding:14px 0;${first ? "" : `border-top:1px solid ${C.line};`}">
      <a href="${href}" style="text-decoration:none;display:block;">
        <span style="font-family:${FONT};font-size:15px;line-height:20px;font-weight:800;color:${C.ink};">${title}</span>
        <span style="font-family:${FONT};font-size:15px;line-height:20px;font-weight:800;color:${C.blue};">&nbsp;&rarr;</span><br>
        <span style="font-family:${FONT};font-size:13px;line-height:20px;color:${C.muted};">${sub}</span>
      </a>
    </td></tr>`;

  const html = shell({
    title: "Thanks for reaching out",
    preheader: `Hi ${d.name}, your message reached me — I'll reply within 24 hours.`,
    header: header({
      bg: C.blue,
      eyebrow: "Message received",
      eyebrowColor: C.white,
      headline: "Let&rsquo;s build something",
      accentWord: "together.",
      accentColor: C.black,
    }),
    body: `
      <tr><td style="font-family:${FONT};font-size:22px;line-height:28px;font-weight:800;letter-spacing:-0.4px;color:${C.ink};">
        Thanks, ${first} &mdash; your message is in.
      </td></tr>
      ${spacer(12)}
      <tr><td style="font-family:${FONT};font-size:15px;line-height:24px;color:${C.body};">
        I&rsquo;ve received your message through my portfolio and I&rsquo;ll read it personally.
      </td></tr>
      ${spacer(20)}
      <tr><td>${callout("What happens next:", "I&rsquo;ll get back to you at this address within 24 hours. Just reply to this email if you want to add anything.")}</td></tr>
      ${spacer(26)}
      <tr><td>${label("Your submission")}</td></tr>
      ${spacer(6)}
      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack">
          ${detailRows([
            ["Reference", `<span style="font-family:Consolas,'Courier New',monospace;font-weight:700;color:${C.blue};">${escapeHtml(d.referenceId)}</span>`],
            ["Sent", received],
            ["Name", `<strong>${name}</strong>`],
            ["Reply to", email],
          ])}
        </table>
      </td></tr>
      ${spacer(26)}
      <tr><td>${messageBox("Your message", d.message)}</td></tr>
      ${spacer(30)}
      <tr><td>${label("While you wait")}</td></tr>
      ${spacer(4)}
      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${linkRow(`${SITE_URL}/#projects`, "See my projects", "Data science, AI/ML and full-stack work", true)}
          ${linkRow(personalInfo.github, "Browse the code on GitHub", personalInfo.github.replace(/^https?:\/\//, ""))}
          ${linkRow(personalInfo.linkedin, "Connect on LinkedIn", "Let&rsquo;s keep in touch")}
        </table>
      </td></tr>
      ${spacer(26)}
      <tr><td>${note(`I&rsquo;m actively looking for internship roles in <strong style="color:${C.ink};">Data Science</strong>, <strong style="color:${C.ink};">AI / ML</strong> and <strong style="color:${C.ink};">Full-Stack Development</strong>.`)}</td></tr>
      ${spacer(26)}
      <tr><td style="font-family:${FONT};font-size:15px;line-height:24px;color:${C.ink};">
        Talk soon,<br><strong style="font-weight:800;">${escapeHtml(personalInfo.name)}</strong>
      </td></tr>
    `,
  });

  const text = [
    `Hi ${d.name},`,
    ``,
    `Thanks for reaching out — your message is in. I'll get back to you within 24 hours.`,
    ``,
    `Reference: ${d.referenceId}`,
    `Sent:      ${formatReceived(d.receivedAt)}`,
    ``,
    `Your message:`,
    d.message,
    ``,
    `While you wait:`,
    `Projects: ${SITE_URL}/#projects`,
    `GitHub:   ${personalInfo.github}`,
    `LinkedIn: ${personalInfo.linkedin}`,
    ``,
    `Talk soon,`,
    personalInfo.name,
  ].join("\n");

  return { subject: `Thanks for reaching out, ${d.name.split(/\s+/)[0] || d.name} · ${d.referenceId}`, html, text };
}

/* ── 3. New client review, published ─────────────────────── */

type ReviewEmailData = {
  name: string;
  role: string;
  company: string;
  service: string;
  rating: number;
  comment: string;
  linkedinUrl?: string;
  projectUrl?: string;
};

export function reviewNotificationEmail(r: ReviewEmailData, invite?: { id: string; name: string; exp: number }) {
  const name = escapeHtml(r.name);
  const inviteDetail = invite ? invite.id + " · " + invite.name + " · Expires " + new Date(invite.exp * 1000).toISOString() : "";
  const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
  const link = (url?: string) => (url ? `<a href="${escapeHtml(url)}" style="color:${C.blue};font-weight:600;">${escapeHtml(url)}</a>` : "&mdash;");

  const html = shell({
    title: `New review from ${r.name}`,
    preheader: `${r.name} left a ${r.rating}-star review: ${r.comment.slice(0, 90)}`,
    header: header({
      bg: C.black,
      eyebrow: `Portfolio &middot; Client review`,
      eyebrowColor: C.blueLight,
      headline: "New review",
      accentWord: "published.",
      accentColor: C.blueLight,
    }),
    body: `
      <tr><td style="font-family:${FONT};font-size:22px;line-height:28px;font-weight:800;letter-spacing:-0.4px;color:${C.ink};">
        ${name} left you a review
      </td></tr>
      ${spacer(18)}
      <tr><td>${callout("Now live:", "this review was added to the Client Reviews section of your portfolio. To take it down, open <code>/admin/reviews</code> and delete it.")}</td></tr>
      ${spacer(26)}
      <tr><td>${label("Details")}</td></tr>
      ${spacer(6)}
      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack">
          ${detailRows([
            ["Rating", `<span style="color:#f59e0b;font-size:16px;letter-spacing:2px;">${stars}</span> <strong>${r.rating}/5</strong>`],
            ["Name", `<strong>${name}</strong>`],
            ["Role", escapeHtml([r.role, r.company].filter(Boolean).join(" · "))],
            ["Service", escapeHtml(r.service)],
            ["Invite", escapeHtml(inviteDetail)],
            ["LinkedIn", link(r.linkedinUrl)],
            ["Project", link(r.projectUrl)],
          ])}
        </table>
      </td></tr>
      ${spacer(26)}
      <tr><td>${messageBox("Review", r.comment)}</td></tr>
    `,
  });

  const text = [
    `NEW CLIENT REVIEW — ${SITE_LABEL}`,
    `Invite: ${inviteDetail}`,
    ``,
    `${r.name} (${[r.role, r.company].filter(Boolean).join(", ")}) rated you ${r.rating}/5 for ${r.service}.`,
    ``,
    r.comment,
    ``,
    `This review is now live on your portfolio. To take it down, open /admin/reviews and delete it.`,
  ].join("\n");

  return { subject: `New ${r.rating}★ review from ${r.name} — now live`, html, text };
}
