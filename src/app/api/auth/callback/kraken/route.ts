import { NextResponse } from "next/server";

const ALLOWED_DOMAINS = [
  "inkonchain.com",
  "preview1.inkonchain.com",
  "preview2.inkonchain.com",
  "localhost",
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      throw new Error("Missing code or state parameters");
    }

    const requestUrl = new URL(request.url);
    const isAllowedDomain = ALLOWED_DOMAINS.some(
      (domain) =>
        requestUrl.hostname === domain ||
        requestUrl.hostname.endsWith(`.${domain}`)
    );

    const baseUrl = isAllowedDomain
      ? `${requestUrl.protocol}//${requestUrl.host}`
      : `https://inkonchain.com`;

    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");

    redirectUrl.searchParams.set("code", code);
    redirectUrl.searchParams.set("state", state);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Callback error: ", error);
    const baseUrl = `https://inkonchain.com`;
    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");

    return NextResponse.redirect(redirectUrl);
  }
}
