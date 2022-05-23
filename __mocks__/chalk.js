const chalk = jest.genMockFromModule("chalk");

chalk.cyan = jest.fn((str) => str);
chalk.blue = jest.fn((str) => str);
chalk.green = jest.fn((str) => str);
chalk.yellow = jest.fn((str) => str);
chalk.red = jest.fn((str) => str);

module.exports = chalk;
