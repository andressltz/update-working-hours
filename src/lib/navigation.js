import { WAIT_TYPES, SELECTORS } from '../constants/index.js'

export async function gotoMainPage({ page }) {
  await page.goto(process.env.PROJECT_URL, {
    waitUntil: WAIT_TYPES.DOMCONTENTLOADED,
  });

  await page.waitForSelector(SELECTORS.TABLE_ITEM);

  await page.waitForSelector(
    SELECTORS.PREVIOUS_MONTH_BUTTON,
  );
}

export async function gotoPreviousMonth({ page }) {
  await page.waitForSelector(
    SELECTORS.PREVIOUS_MONTH_BUTTON,
  );

  const element = await page.waitForSelector(SELECTORS.PREVIOUS_MONTH_BUTTON);

  await element.click()
}
