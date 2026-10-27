import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/conversations",
        "/analytics",
        "/afterthought",
        "/recall",
        "/settings",
        "/onboarding",
        "/demo",
        "/api",
      ],
    },
  };
}
