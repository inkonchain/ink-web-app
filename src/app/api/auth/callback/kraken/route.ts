import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const targetUrl = new URL(
      `${env.INK_VERIFY_API_BASE_URL}/v1/auth/callback/kraken`
    );
    targetUrl.search = new URL(request.url).searchParams.toString();

    await fetch(targetUrl);
  } catch (error) {
    console.error("OAuth callback error:", error);
  }

  return NextResponse.redirect(new URL("/verify?verifyPage=true", request.url));
}
