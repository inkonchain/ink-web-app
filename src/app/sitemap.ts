import { MetadataRoute } from "next";

import { ORIGIN } from "@/env";
import { routing } from "@/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const basicPaths = ["bridge", "faucet", "privacy", "terms"];

  return [
    {
      url: ORIGIN,
      priority: 1,
    },
    ...basicPaths.flatMap((path) =>
      routing.locales.map((lang) => ({
        url:
          ORIGIN +
          (lang !== routing.defaultLocale ? "/" + lang : "") +
          "/" +
          path,
      }))
    ),
  ];
}
