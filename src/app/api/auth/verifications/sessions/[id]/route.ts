import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/env";

// We keep minimal validation just to ensure the ID parameter exists
const RequestParamsSchema = z.object({
  id: z.string().min(1),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Minimal validation of the session ID parameter
    const { id } = RequestParamsSchema.parse(await params);

    if (!id) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      );
    }

    const verifyApiUrl = `${env.KRAKEN_VERIFY_API_BASE_URL}/v1/verifications/sessions/${id}`;

    const response = await fetch(verifyApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Session not found or expired" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          error: `Failed to fetch verification session: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Verification session fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch verification session" },
      { status: 500 }
    );
  }
}
