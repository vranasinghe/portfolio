import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/review", "/admin"] }, sitemap: "https://www.venuja.online/sitemap.xml" };
}
