import { NextResponse } from "next/server";

// Check if we're in production environment
const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

// Define allowed domains - exclude localhost in production
const ALLOWED_DOMAINS = [
  "inkonchain.com",
  "preview1.inkonchain.com",
  "preview2.inkonchain.com",
  ...(isProduction ? [] : ["localhost"]),
];

console.log(
  `[INIT] Environment: ${process.env.NEXT_PUBLIC_ENVIRONMENT}, isProduction: ${isProduction}`
);
console.log(`[INIT] Allowed domains:`, ALLOWED_DOMAINS);

export async function GET(request: Request) {
  console.log(`[AUTH CALLBACK] Request URL: ${request.url}`);
  console.log(
    `[AUTH CALLBACK] Headers:`,
    Object.fromEntries([...request.headers.entries()])
  );
  console.log(`[AUTH CALLBACK] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(
    `[AUTH CALLBACK] NEXT_PUBLIC_ENVIRONMENT: ${process.env.NEXT_PUBLIC_ENVIRONMENT}`
  );

  try {
    const { searchParams } = new URL(request.url);
    console.log(
      `[AUTH CALLBACK] Search params:`,
      Object.fromEntries([...searchParams.entries()])
    );

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      console.log(
        `[AUTH CALLBACK] Missing code or state parameters. code: ${code}, state: ${state}`
      );
      throw new Error("Missing code or state parameters");
    }

    console.log(`[AUTH CALLBACK] Code and state found.`);

    const requestUrl = new URL(request.url);
    console.log(`[AUTH CALLBACK] Request hostname: ${requestUrl.hostname}`);
    console.log(`[AUTH CALLBACK] Request protocol: ${requestUrl.protocol}`);
    console.log(`[AUTH CALLBACK] Request host: ${requestUrl.host}`);
    console.log(`[AUTH CALLBACK] Request origin: ${requestUrl.origin}`);

    const isAllowedDomain = ALLOWED_DOMAINS.some((domain) => {
      const isExactMatch = requestUrl.hostname === domain;
      const isSubdomain = requestUrl.hostname.endsWith(`.${domain}`);
      console.log(
        `[AUTH CALLBACK] Checking domain: ${domain}, exact match: ${isExactMatch}, subdomain match: ${isSubdomain}`
      );
      return isExactMatch || isSubdomain;
    });

    console.log(`[AUTH CALLBACK] Is allowed domain: ${isAllowedDomain}`);

    const baseUrl = isAllowedDomain
      ? `${requestUrl.protocol}//${requestUrl.host}`
      : `https://inkonchain.com`;

    console.log(`[AUTH CALLBACK] Base URL for redirect: ${baseUrl}`);

    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");
    redirectUrl.searchParams.set("code", code);
    redirectUrl.searchParams.set("state", state);

    console.log(
      `[AUTH CALLBACK] Final redirect URL: ${redirectUrl.toString()}`
    );

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error(`[AUTH CALLBACK] Error:`, error);
    const baseUrl = `https://inkonchain.com`;
    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");
    console.log(
      `[AUTH CALLBACK] Error redirect URL: ${redirectUrl.toString()}`
    );

    return NextResponse.redirect(redirectUrl);
  }
}
