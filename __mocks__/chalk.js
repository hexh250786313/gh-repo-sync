const chalk = jest.genMockFromModule("chalk");

chalk.cyan = jest.fn();
chalk.blue = jest.fn();
chalk.green = jest.fn();
chalk.yellow = jest.fn();
chalk.red = jest.fn();

module.exports = chalk;
