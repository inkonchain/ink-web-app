import { z } from "zod";

// Challenge schemas
export const CreateChallengeRequestBody = z.object({
  user_address: z.string(),
});

export const ChallengeResponseBody = z.object({
  id: z.string(),
  user_address: z.string(),
  message: z.string(),
});

// Verification schemas
export const InitVerificationRequestBody = z.object({
  challenge_id: z.string(),
  challenge_signature: z.object({
    r: z.string(),
    s: z.string(),
    v: z.string(),
  }),
});

export const InitVerificationResponseBody = z.object({
  oauth_url: z.string().url(),
});

export const CompleteVerificationRequestBody = z.object({
  code: z.string(),
  state: z.string(),
});

export const RevokeVerificationRequestBody = z.object({
  user_address: z.string(),
});

export const RevokeVerificationResponseBody = z.object({
  message: z.string(),
  status: z.enum(["success", "error"]),
  transaction_hash: z.string(),
});

// Inferred types
export type CreateChallengeRequest = z.infer<typeof CreateChallengeRequestBody>;
export type ChallengeResponse = z.infer<typeof ChallengeResponseBody>;
export type InitVerificationRequest = z.infer<
  typeof InitVerificationRequestBody
>;
export type InitVerificationResponse = z.infer<
  typeof InitVerificationResponseBody
>;
export type CompleteVerificationRequest = z.infer<
  typeof CompleteVerificationRequestBody
>;
export type RevokeVerificationRequest = z.infer<
  typeof RevokeVerificationRequestBody
>;
export type RevokeVerificationResponse = z.infer<
  typeof RevokeVerificationResponseBody
>;

export const CompleteVerificationResponseBody = z.object({
  attestation_uid: z.string(),
  kraken_user_iban: z.string(),
  user_address: z.string(),
  created_at: z.string(),
  transaction_hash: z.string(),
  status: z.string(),
  message: z.string(),
});

export type CompleteVerificationResponse = z.infer<
  typeof CompleteVerificationResponseBody
>;
