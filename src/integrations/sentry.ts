import * as Sentry from "@sentry/nextjs";

import { CustomError } from "@/util/custom-error";

export function captureError(error: unknown) {
  Sentry.captureException(error, {
    extra: getSentryExtra(error),
  });
}

function getSentryExtra(error: unknown) {
  if (error instanceof CustomError) {
    return {
      ...error.getSentryExtra(),
      code: error.code,
    };
  }
}
