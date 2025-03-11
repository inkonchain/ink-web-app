"use server";

import {
  changeUserSubscriptionGroupStatus,
  listUserSubscriptionGroups,
  SubscriptionGroup,
  SubscriptionStatus,
  updateEmailStatusById,
} from "@/integrations/braze";

interface FormState {
  success: boolean;
  error?: string;
}

export async function unsubscribeFromBraze(
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
        SubscriptionStatus.UNSUBSCRIBED
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
        SubscriptionStatus.UNSUBSCRIBED
      );
    } catch {
      return {
        success: false,

        error: "Issue submitting form",
      };
    }
  }

  const { users } = await listUserSubscriptionGroups(brazeId);

  if (!users || users.length === 0) {
    return {
      error: "Could not update your preferences",
      success: false,
    };
  }

  const isUserUnsubscribedFromAllGroups = users[0].subscription_groups.every(
    ({ status }) =>
      status.toLowerCase() === SubscriptionStatus.UNSUBSCRIBED.toLowerCase()
  );

  if (isUserUnsubscribedFromAllGroups) {
    try {
      await updateEmailStatusById(brazeId, SubscriptionStatus.UNSUBSCRIBED);
    } catch {
      return {
        success: false,

        error: "Issue submitting form",
      };
    }
  }

  return {
    success: true,

    error: undefined,
  };
}
