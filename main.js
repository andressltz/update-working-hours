require("dotenv").config();
const { message } = require("./utils");

const { fillWorkingDays } = require("./fill-working-days");

(async () => {
  await fillWorkingDays();

  message.success('\n All working days filled successfully!')
})();
