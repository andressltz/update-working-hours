import { message, wait } from '../utils/index.js';

import { ACTIVITY_TYPE, SELECTORS, WAIT_TIMES, WAIT_TYPES } from "../constants/index.js"

import { getWorkingDaysIndexes, getHoursWithoutActivity, getCurrentWorkingDay } from "./services.js"

export async function fillWorkingDays({ page }) {
  await page.waitForSelector(
    SELECTORS.TABLE_ITEM,
  );

  const validWorkingDaysIndex = await getWorkingDaysIndexes({ page })

  for (const index of validWorkingDaysIndex) {
    const currentWorkingDay = await getCurrentWorkingDay({ page, index })

    message.info(`Filling: ${currentWorkingDay}`)

    try {
      const linkElements = await page.$$(SELECTORS.TABLE_ITEM_LINK)
      const link = linkElements[index];
      await link.click()

      await page.waitForSelector(SELECTORS.TIME_WITHOUT_ACTIVITY)

      const dropdownElement = await page.$(SELECTORS.DROPDOWN)
      await dropdownElement.click();

      // Wait for dropdown open animation
      await wait(WAIT_TIMES.SHORT)
      // TODO: Find a better way to select the option based on the text
      const option = await page.$(SELECTORS.DROPDOWN_OPTION)
      await option.click();

      const hoursWithoutActivity = await getHoursWithoutActivity({ page })

      if (hoursWithoutActivity === '00:00') {
        await page.goBack({
          waitUntil: WAIT_TYPES.DOMCONTENTLOADED,
        })
  
        await page.waitForSelector(SELECTORS.TABLE_ITEM_LINK)
        message.success(`Day ${currentWorkingDay} filled successfully!`)

        continue
      }

      await page.type(SELECTORS.INPUT_TIME, hoursWithoutActivity);
      await page.type(SELECTORS.INPUT_ACTIVITY, ACTIVITY_TYPE);

      const submitButton = await page.$(SELECTORS.SUBMIT_BUTTON)
      await submitButton.click()

      await wait(WAIT_TIMES.LONG)

      await page.goBack({
        waitUntil: WAIT_TYPES.DOMCONTENTLOADED,
      })

      await page.waitForSelector(SELECTORS.TABLE_ITEM_LINK)

      message.success(`Day ${currentWorkingDay} filled successfully!`)
    } catch (error) {
      message.error(error)
    }
  }
}

