## Lambda Puppeteer Template

Basic AWS Lambda + Puppeteer setup for fast creation of new scraping functions.

This project is a template focused on:

- Running headless Chromium in AWS Lambda
- Keeping the handler structure simple and reusable
- Returning consistent JSON responses and errors

---

## Stack

- Node.js `22.x` (Lambda runtime)
- TypeScript
- Serverless Framework v4
- `puppeteer-core`
- `@sparticuz/chromium` (Lambda-compatible Chromium)
- `rebrowser-patches` (postinstall patch for puppeteer-core)

---

## Project Structure

```text
src/
	handlers/
		index.ts                         # Lambda entrypoint
		common/
			errors/                        # Domain errors and codes
			filters/error.filter.ts        # Central error mapping
			http/responses.ts              # HTTP JSON response helper
		infra/scraper.ts                 # Puppeteer wrapper/service
serverless.yml                       # Lambda + HTTP + function URL config
```

---

## Prerequisites

- Node.js 22+
- pnpm (recommended in this project)
- AWS credentials configured for deployment
- Serverless Framework credentials configured

---

## Install

```bash
pnpm install
```

`postinstall` automatically runs:

```bash
rebrowser-patches patch --packageName puppeteer-core
```

---

## Run Locally

Start local API:

```bash
pnpm run dev
```

Default local endpoint:

- `POST http://localhost:3000/scrape`

Request body:

```json
{
	"url": "https://example.com"
}
```

Success response:

```json
{
	"title": "Example Domain"
}
```

Error response examples:

```json
{
	"error": "Missing 'url' parameter",
	"code": "REQUEST_INVALID_PARAMS"
}
```

```json
{
	"error": "An unexpected error occurred",
	"code": "INTERNAL_SERVER_ERROR"
}
```

---

## Deploy

```bash
pnpm run deploy
```

After deploy, Serverless prints the Function URL endpoint.

Current config:

- Region: `us-east-1`
- Memory: `512 MB`
- Timeout: `29s`
---

## Example cURL

Local:

```bash
curl -X POST http://localhost:3000/scrape \
	-H "Content-Type: application/json" \
	-d '{"url":"https://example.com"}'
```

Deployed (Function URL):

```bash
curl -X POST "https://2wtggki3by3ita7fcqcc767zua0cjdyg.lambda-url.us-east-1.on.aws/" \
	-H "Content-Type: application/json" \
	-d '{"url":"https://example.com"}'
```

---

## Reusing This Template for New Functions

1. Copy and adapt `src/handlers/infra/scraper.ts` methods for your scraping logic.
2. Create a new handler file in `src/handlers/` with input validation.
3. Add a new function block in `serverless.yml`.
4. Reuse `http.reply` for success and `ErrorFilter` + domain errors for failures.

This keeps all functions with the same error format and response style.

---

## Scripts

- `pnpm run dev`: run `serverless offline` on port `3000`
- `pnpm run deploy`: deploy to AWS

---

## Notes

- `puppeteer-core` + `@sparticuz/chromium` is recommended for Lambda environments.
- The scraper currently waits for `domcontentloaded` and uses `15s` page timeout.
- Keep scraping logic in `infra/` and handlers thin for easier maintenance.
