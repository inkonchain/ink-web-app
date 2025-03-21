import { env } from "@/env";
import { NextResponse } from "next/server";
import { z } from "zod";

// We keep minimal validation just to ensure the address parameter exists
const RequestParamsSchema = z.object({
  address: z.string().min(1),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    // Minimal validation of the address parameter
    const { address } = RequestParamsSchema.parse(await params);

    // Construct the target URL
    const targetUrl = `${env.INK_VERIFY_API_BASE_URL}/v1/auth/verifications/${address}`;

    // Forward the request with all its original headers
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
    });

    // Return the response as-is
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
