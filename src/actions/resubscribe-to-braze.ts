"use server";

import {
  changeUserSubscriptionGroupStatus,
  SubscriptionGroup,
  SubscriptionStatus,
  updateEmailStatusById,
} from "@/integrations/braze";

interface FormState {
  success: boolean;
  error?: string;
}

export async function resubscribeToBraze(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const brazeId = formData.get("brazeId");
  const generalWaitlist = formData.get("generalWaitlist");
  const developerWaitlist = formData.get("developerWaitlist");

  if (!brazeId || typeof brazeId !== "string") {
    return {
      error: "Issue submitting form",
      success: false,
    };
  }

  if (generalWaitlist !== "on" && developerWaitlist !== "on") {
    return {
      error: "Make sure to select at least one of the waitlists",
      success: false,
    };
  }

  if (generalWaitlist === "on") {
    try {
      await changeUserSubscriptionGroupStatus(
        brazeId,
        SubscriptionGroup.GENERAL_WAITLIST,
        SubscriptionStatus.SUBSCRIBED
      );
    } catch {
      return {
        success: false,

        error: "Issue submitting form",
      };
    }
  }

  if (developerWaitlist === "on") {
    try {
      await changeUserSubscriptionGroupStatus(
        brazeId,
        SubscriptionGroup.DEVELOPER_WAITLIST,
        SubscriptionStatus.SUBSCRIBED
      );
    } catch {
      return {
        success: false,

        error: "Issue submitting form",
      };
    }
  }

  try {
    await updateEmailStatusById(brazeId, SubscriptionStatus.SUBSCRIBED);
  } catch {
    return {
      success: false,

      error: "Issue submitting form",
    };
  }

  return {
    success: true,
    error: undefined,
  };
}
