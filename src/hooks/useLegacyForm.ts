// Adapted from https://allanlasser.com/posts/2024-01-26-avoid-using-reacts-useformstatus
import { SyntheticEvent, useActionState, useTransition } from "react";

import { NEXT_PUBLIC_HCAPTCHA_SITEKEY } from "@/env-client";

import { useHCaptcha } from "./useHCaptcha";

export interface UseLegacyFormHook<FormState> {
  state: FormState;
  isPending: boolean;
  formAction: (payload: FormData) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => Promise<void>;
}

export function useLegacyForm<FormState>(
  action: (state: Awaited<FormState>, formData: FormData) => Promise<FormState>,
  initialState: Awaited<FormState>
): UseLegacyFormHook<FormState> {
  const { executeHCaptcha, hcaptchaLoaded } = useHCaptcha(
    NEXT_PUBLIC_HCAPTCHA_SITEKEY,
    true
  );
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(action, initialState);

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (hcaptchaLoaded) {
      try {
        const captcha = await executeHCaptcha();
        formData.append("captchaToken", captcha.response);
        startTransition(async () => {
          formAction(formData);
        });
      } catch (error) {
        console.error("hCaptcha execution error:", error);
        return;
      }
    } else {
      console.warn("hCaptcha not loaded or not ready");
      return;
    }
  }

  return {
    state,
    isPending,
    formAction,
    onSubmit,
  };
}
