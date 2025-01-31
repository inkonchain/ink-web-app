import { MetadataRoute } from "next";

import { ORIGIN } from "@/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
