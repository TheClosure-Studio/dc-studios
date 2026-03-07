export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/_next",
        "/static",
      ],
    },
    sitemap: "https://dcstudios.in/sitemap.xml",
  };
}
