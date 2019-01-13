/* eslint-disable no-console */
const url = require('url')

const chalk = require('chalk')

const prettyPrintUrl = (port) => {
  return url.format({
    protocol: 'http',
    hostname: 'localhost',
    port,
    pathname: '/',
  })
}

function printInstructions(title, port) {
  console.log()
  console.log(`You can now view ${chalk.bold(title)} in the browser.`)
  console.log()
  console.log(
    `  ${chalk.bold('Local:')}           ${prettyPrintUrl(port)}`,
  )
}
module.exports = printInstructions
