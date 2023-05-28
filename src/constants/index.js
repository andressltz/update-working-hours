export const ACTIVITY_TYPE = 'Desenvolvimento'

export const SELECTORS = {
  TABLE_ITEM: ".line-wrapper__content",
  TABLE_ITEM_WEEKEND: ".message-info--non-working-day",
  TABLE_ITEM_HOURS: ".shift-hours__data",
  TABLE_ITEM_LINK: ".line-body__styled-link",
  TABLE_ITEM_DATE: ".line-body__details--date",
  DROPDOWN: ".activities-registry__container__activityType .select-container .select",
  DROPDOWN_OPTION: 'div[id^="react-select-"][id$="-option-8"]',
  TIME_WITHOUT_ACTIVITY: ".worked-time-without-activity",
  INPUT_TIME: "#time",
  INPUT_ACTIVITY: "#activity",
  SUBMIT_BUTTON: ".activities-registry__container__submit-button-container .button",
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
    name: 'Janeiro ',
    value: 'janeiro',
  },
  {
    name: 'Fevereiro ',
    value: 'fevereiro',
  },
  {
    name: 'Março',
    value: 'março',
  },
  {
    name: 'Abril',
    value: 'abril ',
  },
  {
    name: 'Maio',
    value: 'maio',
  },
  {
    name: 'Junho',
    value: 'junho',
  },
  {
    name: 'Julho',
    value: 'july',
  },
  {
    name: 'Agosto',
    value: 'august',
  },
  {
    name: 'Setembro',
    value: 'september',
  },
  {
    name: 'Outubro',
    value: 'october',
  },
  {
    name: 'Novembro',
    value: 'november',
  },
  {
    name: 'Dezembro',
    value: 'december',
  }, 
]

