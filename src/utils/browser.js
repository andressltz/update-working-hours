import puppeteer from "puppeteer"

export async function initBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    product: "chrome",
    args: [
      "--user-data-dir=~/Library/Application Support/Google/Chrome/Default",
    ],
  });
  
  const page = await browser.newPage();

  return { browser, page };
}

export const wait = async (ms) => new Promise((r) => setTimeout(r, ms));
