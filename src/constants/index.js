export const ACTIVITY_TYPE = 'Tarefas diarias de desenvolvimento de software.'

export const SELECTORS = {
  TABLE_ITEM: ".line-wrapper__content",
  TABLE_ITEM_WEEKEND: ".message-info--non-working-day",
  TABLE_ITEM_HOURS: ".shift-hours__data",
  TABLE_ITEM_LINK: ".line-body__styled-link",
  TABLE_ITEM_DATE: ".line-body__details--date",
  DROPDOWN: ".activities-registry__container__activityType .select-container .select",
  DROPDOWN_OPTION: 'div[id^="react-select-"][id$="-option-8"]',
  TIME_WITHOUT_ACTIVITY: ".worked-time-without-activity",
  INPUT_TIME: ".input-new-container__input",
  INPUT_ACTIVITY: "#activity",
  SUBMIT_BUTTON: ".activities-registry__container__submit-button-container .button",
  PREVIOUS_MONTH_BUTTON: ".month-header__line__change-page-button"
}

export const WAIT_TIMES = {
  SHORT: 500,
  LONG: 2000,
}

export const WAIT_TYPES = {
  DOMCONTENTLOADED: "domcontentloaded",
}

export const MONTH_OPTIONS = [
  {
    name: 'Atual ',
    value: 'current',
  },
  {
    name: 'Anterior ',
    value: 'previous',
  },
]

