import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      throw new Error("Missing code or state parameters");
    }

    const response = await fetch(
      `${env.KRAKEN_VERIFY_API_BASE_URL}/v1/auth/verifications/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }),
      }
    );

    const data = await response.json();

    const redirectUrl = new URL("/verify", request.url);
    redirectUrl.searchParams.set("verifyPage", "true");
    redirectUrl.searchParams.set("status", response.ok ? "success" : "error");
    redirectUrl.searchParams.set("message", data.message || "Unknown response");

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    const redirectUrl = new URL("/verify", request.url);
    redirectUrl.searchParams.set("verifyPage", "true");
    redirectUrl.searchParams.set("status", "error");
    redirectUrl.searchParams.set("message", "Failed to complete verification");

    return NextResponse.redirect(redirectUrl);
  }
}
