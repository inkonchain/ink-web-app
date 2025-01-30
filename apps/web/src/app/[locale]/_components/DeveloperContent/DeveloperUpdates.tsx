"use client";

import { useActionState } from "react";

import { subscribeToDeveloperWaitlist } from "@/actions/subscribe-to-braze";
import { MailIcon } from "@/components/icons/Mail";
import { InputWithSubmit } from "@/components/InputWithSubmit";

export const DeveloperUpdates = () => {
  const [_, formAction] = useActionState(subscribeToDeveloperWaitlist, {
    success: false,
    error: undefined,
  });

  return (
    <form action={formAction} data-testid="developer-email-form">
      <InputWithSubmit
        id="email"
        name="email"
        variant="transparent-on-dark"
        placeholder="Get builder updates"
        icon={<MailIcon size="icon-lg" enforce="blend" />}
      />
    </form>
  );
};
