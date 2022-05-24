const result = {
  start: jest.fn(() => result),
  stop: jest.fn(() => result),
  succeed: jest.fn((str) => str),
  fail: jest.fn((str) => str),
};
const ora = jest.fn(() => result);

module.exports = ora;
