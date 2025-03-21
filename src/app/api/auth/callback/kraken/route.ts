import { NextResponse } from "next/server";

import { env } from "@/env";

export async function GET(request: Request) {
  try {
    console.log("=== Kraken Callback Debug Logs ===");
    console.log("1. Original Request URL:", request.url);
    console.log("2. Request Headers:", Object.fromEntries(request.headers));

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    console.log("3. Auth Params:", { code: code?.slice(0, 10) + "...", state });

    if (!code || !state) {
      throw new Error("Missing code or state parameters");
    }

    const verifyApiUrl = `${env.KRAKEN_VERIFY_API_BASE_URL}/v1/auth/verifications/complete`;
    console.log("4. Verify API URL:", verifyApiUrl);

    const response = await fetch(verifyApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, state }),
    });

    const data = await response.json();
    console.log("5. API Response:", {
      status: response.status,
      ok: response.ok,
      data: { ...data, code: undefined }, // Omit sensitive data
    });

    // Instead of using request.url, let's use X-Forwarded-Host or Host header
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "";
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const baseUrl = `${protocol}://${host}`;

    console.log("6. Constructed Base URL:", baseUrl);

    const redirectUrl = new URL("/verify", baseUrl);
    console.log("7. Initial Redirect URL:", redirectUrl.toString());

    redirectUrl.searchParams.set("verifyPage", "true");
    redirectUrl.searchParams.set("status", response.ok ? "success" : "error");
    redirectUrl.searchParams.set("message", data.message);
    redirectUrl.searchParams.set(
      "txHash",
      data.transaction_hash || "Unknown transaction hash"
    );

    console.log("8. Final Redirect URL:", redirectUrl.toString());

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("=== Kraken Callback Error ===", error);

    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "";
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const baseUrl = `${protocol}://${host}`;

    const redirectUrl = new URL("/verify", baseUrl);
    redirectUrl.searchParams.set("verifyPage", "true");
    redirectUrl.searchParams.set("status", "error");
    redirectUrl.searchParams.set("message", "Failed to complete verification");

    console.log("9. Error Redirect URL:", redirectUrl.toString());

    return NextResponse.redirect(redirectUrl);
  }
}
// https://www.kraken.com/oauth/authorize?client_id=284af555400c9e46cca086aa028d9348&redirect_uri=https%3A%2F%2Fpreview1.inkonchain.com%2Fapi%2Fauth%2Fcallback%2Fkraken&scope=account.info:basic&state=ac575dd8-8098-4cac-b119-f8962b4cdb19
