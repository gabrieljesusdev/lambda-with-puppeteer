import { DomainError } from "../errors/domain.error";
import { http } from "../http/responses";

export const ErrorFilter = (error: unknown) => {
  console.error("Error occurred:", error);

  if (error instanceof DomainError) {
    return http.reply(400, { error: error.message, code: error.code });
  }

  return http.reply(500, {
    error: "An unexpected error occurred",
    code: "INTERNAL_SERVER_ERROR",
  });
};
