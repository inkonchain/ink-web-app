// Adapted from https://allanlasser.com/posts/2024-01-26-avoid-using-reacts-useformstatus
import { SyntheticEvent, useActionState, useTransition } from "react";

import { useCaptcha } from "@/contexts/CaptchaProvider";

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
  const { isReady, executeHCaptcha } = useCaptcha();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(action, initialState);

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isReady) {
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
