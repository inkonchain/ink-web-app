import { NextResponse } from "next/server";

import { env } from "@/env";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      throw new Error("Missing code or state parameters");
    }

    const verifyApiUrl = `${env.KRAKEN_VERIFY_API_BASE_URL}/v1/verifications/complete`;

    const response = await fetch(verifyApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, state }),
    });

    const data = await response.json();

    // Get the session ID from the response
    const sessionId = data.session_id;

    // Construct the redirect URL
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "";
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const baseUrl = `${protocol}://${host}`;

    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");

    // Include the session ID in the redirect URL if it exists
    if (sessionId) {
      redirectUrl.searchParams.set("session", sessionId);
    }

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
