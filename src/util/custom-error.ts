export enum ErrorCode {
  Braze = "Braze",
}

export type StandardErrorValue = {
  code?: ErrorCode;
  message: string;
};

export interface BaseCustomError {
  causeError?: Error;
  throwingFunction: string;
}

interface CustomErrorParams {
  status: number;
  code: ErrorCode;
  message: string;
  extra?: Record<string, unknown>;
  causeError?: unknown;
}

export class CustomError extends Error {
  public message: string;
  public status: number;
  public code: ErrorCode;
  private extra: Record<string, unknown>;
  private causeError?: Error;

  constructor(params: CustomErrorParams) {
    const { status, code, message, extra = {}, causeError } = params;
    super(message);

    this.message = message;
    this.status = status;
    this.code = code;
    this.extra = extra;
    this.causeError = this.parseCauseError(causeError);
  }

  getSentryExtra(): Record<string, unknown> {
    return {
      ...this.extra,
      stack: this.causeError?.stack,
    };
  }

  private parseCauseError(causeError: unknown) {
    if (causeError instanceof Error) {
      return causeError;
    }

    if (typeof causeError === "string") {
      return new Error(causeError);
    }
  }
}
