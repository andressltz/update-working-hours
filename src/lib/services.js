import { SELECTORS } from '../constants/index.js'

export async function getWorkingDaysIndexes({ page }) {
  await page.waitForSelector(
    SELECTORS.TABLE_ITEM,
  );

  const validItems = [];
  const items = await page.$$(SELECTORS.TABLE_ITEM)

  for (const [index, item] of items.entries()) {
    const filledHoursEls = await item.$$(SELECTORS.TABLE_ITEM_HOURS);
    const weekendInfoEl = await item.$(SELECTORS.TABLE_ITEM_WEEKEND);

    const hasValidContent = filledHoursEls && filledHoursEls.length > 0;

    if (hasValidContent && !weekendInfoEl) {
      validItems.push(index)
    }
  }

  return validItems
}

export async function getHoursWithoutActivity({ page }) {
   const hoursWithoutActivityEl = await page.waitForSelector(
    SELECTORS.TIME_WITHOUT_ACTIVITY,
  );

  const hoursWithoutActivityText = await hoursWithoutActivityEl?.evaluate(el => el.textContent);

  return hoursWithoutActivityText.replace('Horas sem atividade: ', '')
}

export async function getCurrentWorkingDay({ page, index }) {
  await page.waitForSelector(
    SELECTORS.TABLE_ITEM_DATE,
  )

  const currentWorkingDayEls = await page.$$(SELECTORS.TABLE_ITEM_DATE);

  const currentWorkingDayText = await currentWorkingDayEls[index].evaluate(el => el.textContent);

  return currentWorkingDayText
}