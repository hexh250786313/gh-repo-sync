// const commandExists = jest.genMockFromModule("command-exists");

const commandExists = jest.fn(() => {
  throw new Error();
});

module.exports = commandExists;
