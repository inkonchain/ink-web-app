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
  const generalWailist = formData.get("generalWailist");
  const developerWailist = formData.get("developerWailist");

  if (!brazeId || typeof brazeId !== "string") {
    return {
      error: "Issue submitting form",
      success: false,
    };
  }

  if (generalWailist !== "on" && developerWailist !== "on") {
    return {
      error: "Make sure to select at least one of the waitlists",
      success: false,
    };
  }

  if (generalWailist === "on") {
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

  if (developerWailist === "on") {
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
