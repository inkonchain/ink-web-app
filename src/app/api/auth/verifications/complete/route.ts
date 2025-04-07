import { NextResponse } from "next/server";

import { env } from "@/env";

interface KrakenVerifyResponse {
  attestation_uid: string;
  kraken_user_iban: string;
  user_address: string;
  created_at: string;
  transaction_hash: string;
  status: string;
  message: string;
}

interface KrakenErrorResponse {
  status: number;
  message: string;
}

export async function POST(request: Request) {
  try {
    const { code, state } = await request.json();

    if (!code || !state) {
      return NextResponse.json(
        {
          status: 400,
          message: "Missing code or state parameters",
        },
        { status: 400 }
      );
    }

    const verifyApiUrl = `${env.KRAKEN_VERIFY_API_BASE_URL}/v1/verifications/complete`;

    const response = await fetch(verifyApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, state }),
    });

    // Parse the response body whether it's success or error
    const data = await response.json();

    if (!response.ok) {
      // If it's a 400 error, it likely has a specific reason we should pass along
      if (response.status === 400 && data?.message) {
        return NextResponse.json(
          {
            status: 400,
            message: data.message,
          },
          { status: 400 }
        );
      }

      // For other errors, return a more generic message
      return NextResponse.json(
        {
          status: response.status,
          message: "Failed to complete verification",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error during verification",
      },
      { status: 500 }
    );
  }
}
