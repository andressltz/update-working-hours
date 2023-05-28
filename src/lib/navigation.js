import { WAIT_TYPES } from '../constants/index.js'

export function gotoMainPage({ page }) {
  return page.goto(process.env.PROJECT_URL, {
    waitUntil: WAIT_TYPES.DOMCONTENTLOADED,
  });
}

export function gotoCurrentMonth({ page, answer }) {
  return page.goto(`${process.env.PROJECT_URL}/${answer}`, {
    waitUntil: WAIT_TYPES.DOMCONTENTLOADED,
  });
}
