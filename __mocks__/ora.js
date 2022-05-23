const result = {
  start: jest.fn(),
  stop: jest.fn(),
  succeed: jest.fn(),
  fail: jest.fn(),
};
const ora = jest.fn(() => result);

module.exports = ora;
