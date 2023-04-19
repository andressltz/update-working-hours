require("dotenv").config();
const puppeteer = require("puppeteer");
const { message } = require("./utils");

const { ACTIVITY_TYPE, SELECTORS, WAIT_TIMES, WAIT_TYPES } = require("./constants");

const wait = async (ms) => new Promise((r) => setTimeout(r, ms));

async function fillWorkingDays() {
  const browser = await puppeteer.launch({
    headless: false,
    product: "chrome",
    args: [
      "--user-data-dir=~/Library/Application Support/Google/Chrome/Default",
    ],
  });

  const page = await browser.newPage();

  await page.goto(process.env.PROJECT_URL, {
    waitUntil: WAIT_TYPES.DOMCONTENTLOADED,
  });

  await page.waitForSelector(
    SELECTORS.TABLE_ITEM,
  );
  
  const getWorkingDaysIndexes = async () => await page.evaluate((SELECTORS) => {
    const validItems = [];
    const items = document.querySelectorAll(SELECTORS.TABLE_ITEM)

    items.forEach(async (item, index) => {
      const filledHoursEls = item.querySelectorAll(SELECTORS.TABLE_ITEM_HOURS);
      const weekendInfoEl = item.querySelector(SELECTORS.TABLE_ITEM_WEEKEND);

      const hasValidContent = filledHoursEls && filledHoursEls.length > 0;
  
      if (hasValidContent && !weekendInfoEl) {
        validItems.push(index)
      }
    })

    return validItems
  }, SELECTORS)

  const getHoursWithoutActivity = async () => await page.evaluate((SELECTORS) => {
    const hoursWithoutActivityText = document.querySelector(SELECTORS.TIME_WITHOUT_ACTIVITY)

    return hoursWithoutActivityText?.innerText?.replace('Horas sem atividade ', '') || '00:00'
  }, SELECTORS)

  const getCurrentWorkingDay = async (index) => await page.evaluate((index, SELECTORS) => {
    const currentWorkingDay = document.querySelectorAll(SELECTORS.TABLE_ITEM_DATE)[index]

    return currentWorkingDay.innerText
  }, index, SELECTORS)

  const validWorkingDaysIndex = getWorkingDaysIndexes()

  for (const index of validWorkingDaysIndex) {
    const currentWorkingDay = await getCurrentWorkingDay(index)

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

      const hoursWithoutActivity = await getHoursWithoutActivity()

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

  await browser.close()
}

module.exports = {
  fillWorkingDays
}
