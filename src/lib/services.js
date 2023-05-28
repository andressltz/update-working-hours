import { SELECTORS } from '../constants/index.js'

export const getWorkingDaysIndexes = async ({ page }) => await page.evaluate((SELECTORS) => {
  const validItems = [];
  const items = document.querySelectorAll(SELECTORS.TABLE_ITEM)

  items.forEach((item, index) => {
    const filledHoursEls = item.querySelectorAll(SELECTORS.TABLE_ITEM_HOURS);
    const weekendInfoEl = item.querySelector(SELECTORS.TABLE_ITEM_WEEKEND);

    const hasValidContent = filledHoursEls && filledHoursEls.length > 0;

    if (hasValidContent && !weekendInfoEl) {
      validItems.push(index)
    }
  })

  return validItems
}, SELECTORS)

export const getHoursWithoutActivity = async ({ page }) => await page.evaluate((SELECTORS) => {
  const hoursWithoutActivityText = document.querySelector(SELECTORS.TIME_WITHOUT_ACTIVITY)

  return hoursWithoutActivityText?.innerText?.replace('Horas sem atividade ', '') || '00:00'
}, SELECTORS)

export const getCurrentWorkingDay = async (index) => await page.evaluate((index, SELECTORS) => {
  const currentWorkingDay = document.querySelectorAll(SELECTORS.TABLE_ITEM_DATE)[index]

  return currentWorkingDay.innerText
}, index, SELECTORS)