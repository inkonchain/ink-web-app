import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./routing";

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

// Create and export the middleware
const routingMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  Array.from(searchParams.entries()).forEach(([key, value]) => {
    if (value === "true" || value === "false") {
      requestHeaders.set(`x-feature-flag-${key}`, value);
    }
  });

  const response = routingMiddleware(request);

  Array.from(requestHeaders.entries()).forEach(([key, value]) => {
    if (key.startsWith("x-feature-flag-")) {
      response.headers.set(key, value);
    }
  });

  return response;
}

// Configure matcher
export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /static (public files)
  // - /*.* (files with extensions)
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
