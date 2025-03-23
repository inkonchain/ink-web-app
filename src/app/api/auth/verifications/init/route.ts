import { NextResponse } from "next/server";

import { env } from "@/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${env.KRAKEN_VERIFY_API_BASE_URL}/v1/auth/verifications/init`,
      {
        method: request.method,
        headers: request.headers,
        body: JSON.stringify(body),
      }
    );

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}
