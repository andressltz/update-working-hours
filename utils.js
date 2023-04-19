const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
}

function error(message) {
  console.log(colors.red, message, colors.reset)
}

function success(message) {
  console.log(colors.green, message, colors.reset)
}

function info(message) {
  console.log(colors.reset, message)
}

const message = { error, success, info }

module.exports = {
  message
}