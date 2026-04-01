import { Browser } from "puppeteer-core";

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import {
  ScraperBrowserCloseError,
  ScraperBrowserIsNotInitializedError,
} from "../common/errors/scraper.error";

export class Scraper {
  public browser: Promise<Browser> | null = null;

  getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = chromium.executablePath().then((executablePath) =>
        puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: chromium.headless,
        }),
      );
    }

    return this.browser;
  }

  async getPageTitle(url: string): Promise<string> {
    const browser = await this.getBrowser();

    if (!browser) {
      throw new ScraperBrowserIsNotInitializedError();
    }

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });

    const title = await page.title();

    await page.close();
    return title;
  }

  async close() {
    const browser = await this.getBrowser();

    if (!browser) {
      throw new ScraperBrowserCloseError();
    }

    await browser.close();
    this.browser = null;
  }
}
