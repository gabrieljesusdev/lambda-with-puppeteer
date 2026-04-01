import { DomainError } from "./domain.error";

export class RequestInvalidParamsError extends DomainError {
  constructor(message: string) {
    super({
      message,
      code: "REQUEST_INVALID_PARAMS",
    });
  }
}
