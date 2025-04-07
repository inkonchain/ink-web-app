import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      throw new Error("Missing code or state parameters");
    }

    // Construct the redirect URL
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "";
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const baseUrl = `${protocol}://${host}`;

    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");

    // Pass code and state parameters directly instead of making API call
    redirectUrl.searchParams.set("code", code);
    redirectUrl.searchParams.set("state", state);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Callback error: ", error);

    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "";
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const baseUrl = `${protocol}://${host}`;

    // Only include verifyPage parameter
    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");

    return NextResponse.redirect(redirectUrl);
  }
}
