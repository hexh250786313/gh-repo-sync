/**
 * this will generate a mock function that will implement the run-command
 * */
// const runCommand = jest.fn((...val) => {
// const actual = jest.requireActual("../src/utils/run-command").default;
// return new actual(...val);
// });

const runCommand = jest.fn((...val) => {
  const repo = /gh repo sync /g.test(val[0]);
  if (repo) {
    if (/[^/]{1,}\/[^/]{1,}/g.test(val[0]) && /\S{1,}\/\S{1,}/g.test(val[0])) {
      // I got the correct repo name!
    } else {
      throw new Error("Will throw an error from test");
    }
  } else if (/gh auth status/g.test(val[0])) {
    // Test for an invalid gh auth status ( No login token )
    throw new Error("Will throw an error from test");
  }
});

module.exports = runCommand;
