"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { resubscribeToBraze } from "@/actions/resubscribe-to-braze";
import { Button } from "@/components/Button/Button";
import { ButtonLink } from "@/components/Button/ButtonLink";
import { FormStatus } from "@/components/FormStatus";

interface ResubscribeFormProps {
  userBrazeId: string;
  email: string;
}

export const ResubscribeForm: React.FC<ResubscribeFormProps> = ({
  userBrazeId,
  email,
}) => {
  const [state, formAction] = useActionState(resubscribeToBraze, {
    success: false,
    error: undefined,
  });

  if (state.success) {
    return (
      <div className="flex flex-col gap-6">
        <h1>
          You{"'"}ve successfully resubscribed to the Ink Newsletter, If this
          was a mistake, use the button below to unsubscribe
        </h1>

        <ButtonLink
          href={{
            pathname: "/newsletter/unsubscribe",
            query: { id: userBrazeId },
          }}
          variant="primary"
          size="md"
          className="uppercase mt-12"
        >
          Unsuscribe
        </ButtonLink>
      </div>
    );
  }

  return (
    <form className="relative flex flex-col gap-6" action={formAction}>
      <div>Email: {email}</div>
      <h2 className="text-3xl">What groups do you want to resubscribe to?</h2>
      <div className="flex gap-4 pl-5">
        <input
          id="brazeId"
          name="brazeId"
          value={userBrazeId}
          className="hidden"
          aria-hidden
          readOnly
        />

        <div className="h-6 flex items-center">
          <input
            type="checkbox"
            id="generalWailist"
            name="generalWailist"
            className="h-4 w-4 rounded border-gray-300 text-whiteMagic"
          />
        </div>

        <label htmlFor="generalWailist" className="font-medium">
          General Waitlist
        </label>
      </div>

      <div className="flex gap-4 pl-5">
        <div className="h-6 flex items-center">
          <input
            type="checkbox"
            id="developerWailist"
            name="developerWailist"
            className="h-4 w-4 rounded border-gray-300 text-whiteMagic"
          />
        </div>

        <label htmlFor="developerWailist" className="font-medium">
          Developer Waitlist
        </label>
      </div>

      <Submit />

      {state.error && <ErrorState errorMessage={state.error} />}
    </form>
  );
};

interface ErrorStateProps {
  errorMessage: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage }) => {
  const { pending } = useFormStatus();

  if (pending) return null;

  return (
    <div className="absolute -bottom-[100px] left-1/2 -translate-x-1/2">
      <FormStatus errorMessage={errorMessage} />
    </div>
  );
};

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      pending={pending}
      type="submit"
      variant="primary"
      size="md"
      className="uppercase mt-6"
    >
      Resubscribe
    </Button>
  );
};
