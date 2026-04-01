import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

import { http } from "./common/http/responses";
import { Scraper } from "./infra/scraper";
import { RequestInvalidParamsError } from "./common/errors/request.error";
import { ErrorFilter } from "./common/filters/error.filter";

interface RequestLambdaBody {
  url: string;
}

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const body: RequestLambdaBody = JSON.parse(event.body || "{}");
    if (!body.url)
      throw new RequestInvalidParamsError("Missing 'url' parameter");

    const scraper = new Scraper();
    const title = await scraper.getPageTitle(body.url);

    return http.reply(200, { title });
  } catch (e) {
    return ErrorFilter(e);
  }
};
