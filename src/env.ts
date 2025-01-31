// We can assign them as non-null since we check for this below.
// This also allows for imports to trust they're strings.
// TODO: Alternatively in the future we could use zod for much better validation in this file.
const ORIGIN = process.env.ORIGIN!;

const BRAZE_INSTANCE_URL = process.env.BRAZE_INSTANCE_URL!;
const BRAZE_API_KEY = process.env.BRAZE_API_KEY!;
const BRAZE_GENERAL_WAITLIST_GROUP_ID =
  process.env.BRAZE_GENERAL_WAITLIST_GROUP_ID!;
const BRAZE_DEVELOPERS_WAITLIST_GROUP_ID =
  process.env.BRAZE_DEVELOPERS_WAITLIST_GROUP_ID!;
const INK_APP_SUBMISSION_BOT_GITHUB_APP_ID =
  process.env.INK_APP_SUBMISSION_BOT_GITHUB_APP_ID!;
const INK_APP_SUBMISSION_BOT_GITHUB_PRIVATE_KEY =
  process.env.INK_APP_SUBMISSION_BOT_GITHUB_PRIVATE_KEY!;
const INK_APP_SUBMISSION_BOT_GITHUB_INSTALLATION_ID =
  process.env.INK_APP_SUBMISSION_BOT_GITHUB_INSTALLATION_ID!;
const INK_APP_SUBMISSION_SLACK_BOT_TOKEN =
  process.env.INK_APP_SUBMISSION_SLACK_BOT_TOKEN!;
const INK_APP_SUBMISSION_TARGET_ORG =
  process.env.INK_APP_SUBMISSION_TARGET_ORG!;
const INK_APP_SUBMISSION_TARGET_REPO =
  process.env.INK_APP_SUBMISSION_TARGET_REPO!;
const INK_APP_SUBMISSION_TARGET_BRANCH =
  process.env.INK_APP_SUBMISSION_TARGET_BRANCH!;
const INK_APP_SUBMISSION_SLACK_NOTIFICATION_CHANNEL =
  process.env.INK_APP_SUBMISSION_SLACK_NOTIFICATION_CHANNEL!;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET!;

if (typeof window === "undefined") {
  if (!BRAZE_INSTANCE_URL) {
    throw new Error("Missing environment variable BRAZE_INSTANCE_URL.");
  }

  if (!BRAZE_API_KEY) {
    throw new Error("Missing environment variable BRAZE_API_KEY.");
  }

  if (!BRAZE_GENERAL_WAITLIST_GROUP_ID) {
    throw new Error(
      "Missing environment variable BRAZE_GENERAL_WAITLIST_GROUP_ID."
    );
  }

  if (!BRAZE_DEVELOPERS_WAITLIST_GROUP_ID) {
    throw new Error(
      "Missing environment variable BRAZE_DEVELOPERS_WAITLIST_GROUP_ID."
    );
  }

  if (!ORIGIN) {
    throw new Error("Missing environment variable ORIGIN.");
  }

  if (!INK_APP_SUBMISSION_BOT_GITHUB_APP_ID) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_BOT_GITHUB_APP_ID"
    );
  }
  if (!INK_APP_SUBMISSION_BOT_GITHUB_PRIVATE_KEY) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_BOT_GITHUB_PRIVATE_KEY"
    );
  }
  if (!INK_APP_SUBMISSION_BOT_GITHUB_INSTALLATION_ID) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_BOT_GITHUB_INSTALLATION_ID"
    );
  }
  if (!INK_APP_SUBMISSION_SLACK_BOT_TOKEN) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_SLACK_BOT_TOKEN"
    );
  }
  if (!INK_APP_SUBMISSION_TARGET_ORG) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_TARGET_ORG"
    );
  }
  if (!INK_APP_SUBMISSION_TARGET_REPO) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_TARGET_REPO"
    );
  }
  if (!INK_APP_SUBMISSION_TARGET_BRANCH) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_TARGET_BRANCH"
    );
  }
  if (!INK_APP_SUBMISSION_SLACK_NOTIFICATION_CHANNEL) {
    throw new Error(
      "Missing environment variable INK_APP_SUBMISSION_SLACK_NOTIFICATION_CHANNEL"
    );
  }
  if (!HCAPTCHA_SECRET) {
    throw new Error("Missing environment variable HCAPTCHA_SECRET");
  }
}

export * from "@/env-client";
export {
  BRAZE_API_KEY,
  BRAZE_DEVELOPERS_WAITLIST_GROUP_ID,
  BRAZE_GENERAL_WAITLIST_GROUP_ID,
  BRAZE_INSTANCE_URL,
  HCAPTCHA_SECRET,
  INK_APP_SUBMISSION_BOT_GITHUB_APP_ID,
  INK_APP_SUBMISSION_BOT_GITHUB_INSTALLATION_ID,
  INK_APP_SUBMISSION_BOT_GITHUB_PRIVATE_KEY,
  INK_APP_SUBMISSION_SLACK_BOT_TOKEN,
  INK_APP_SUBMISSION_SLACK_NOTIFICATION_CHANNEL,
  INK_APP_SUBMISSION_TARGET_BRANCH,
  INK_APP_SUBMISSION_TARGET_ORG,
  INK_APP_SUBMISSION_TARGET_REPO,
  ORIGIN,
};
