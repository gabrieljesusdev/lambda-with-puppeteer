import { DomainErrorCode } from "./error.codes";

interface DomainErrorOptions {
  code: DomainErrorCode;
  message: string;
}

export class DomainError extends Error {
  public code: DomainErrorCode;

  constructor({ code, message }: DomainErrorOptions) {
    super(message);

    this.code = code;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
