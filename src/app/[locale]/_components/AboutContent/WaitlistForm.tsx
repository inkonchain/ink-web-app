"use client";

import { useActionState } from "react";

import { subscribeToGeneralWaitlist } from "@/actions/subscribe-to-braze";
import { FormStatus } from "@/components/FormStatus";
import { EmailIcon } from "@/components/icons/Email";
import { InputWithSubmit } from "@/components/InputWithSubmit";

export const WaitlistForm: React.FC = () => {
  const [state, formAction] = useActionState(subscribeToGeneralWaitlist, {
    success: false,
    error: undefined,
  });

  return (
    <form className="w-fit" action={formAction} data-testid="about-email-form">
      <InputWithSubmit
        id="email"
        name="email"
        variant="default"
        icon={<EmailIcon size="icon-lg" enforce="black" />}
        placeholder="Subscribe for Updates"
      />

      {state.error?.form && (
        <div className="relative">
          <FormStatus errorMessage={state.error.form} />
        </div>
      )}
    </form>
  );
};
