import { useFormStatus } from "react-dom";

import { WarningTriangleIcon } from "./icons/WarningTriangle";
import { TemporaryMessage } from "./TemporaryMessage";

export interface FormStatusProps {
  errorMessage?: string;
  success?: boolean;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  errorMessage,
  success,
}) => {
  const { pending } = useFormStatus();

  if (pending) return null;

  return (
    <>
      {errorMessage && (
        <TemporaryMessage timeout={3000}>
          <div className="flex items-center gap-3 py-3 px-4 ink:text-status-error ink:bg-status-error rounded-full w-full">
            <WarningTriangleIcon size="icon-md" enforce="inherit" />
            <div className="text-base font-medium">{errorMessage}</div>
          </div>
        </TemporaryMessage>
      )}

      {success && (
        <TemporaryMessage timeout={3000}>
          <div className="absolute top-0 left-0 p-8 bg-green-600 text-white">
            Congrats, now you will always be up to date
          </div>
        </TemporaryMessage>
      )}
    </>
  );
};
