// Dev-only preview of the contact emails: /api/contact/preview?type=owner|visitor
import { ownerNotificationEmail, visitorConfirmationEmail } from "@/lib/emailTemplates";

export const runtime = "nodejs";

export function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  const type = new URL(request.url).searchParams.get("type");
  const data = {
    name: "Alex Perera",
    email: "alex.perera@example.com",
    message:
      "Hi Venuja,\n\nI came across your portfolio and really liked your ML projects. We have a Data Science internship opening next quarter — would you be open to a quick call this week?\n\nBest,\nAlex",
    referenceId: "VR-MSG-3F9A21C7",
    receivedAt: new Date(),
  };
  const { html } = type === "visitor" ? visitorConfirmationEmail(data) : ownerNotificationEmail(data);
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
