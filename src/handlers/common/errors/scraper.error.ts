import { DomainError } from "./domain.error";

export class ScraperBrowserIsNotInitializedError extends DomainError {
  constructor() {
    super({
      code: "BROWSER_INIT_ERROR",
      message: "Failed to initialize the browser",
    });
  }
}

export class ScraperBrowserCloseError extends DomainError {
  constructor() {
    super({
      code: "BROWSER_CLOSE_ERROR",
      message: "Failed to close the browser",
    });
  }
}
