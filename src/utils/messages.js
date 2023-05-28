const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
}

export function error(message) {
  console.log(colors.red, message, colors.reset)
}

export function success(message) {
  console.log(colors.green, message, colors.reset)
}

export function info(message) {
  console.log(colors.reset, message)
}

export const message = { error, success, info }
