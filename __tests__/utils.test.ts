import chalk from "chalk";
import commandExists from "command-exists";
import ora from "ora";
import { prefix } from "../src/constants";
import {
  ifExistGH,
  ifLoginGH,
  isAllArgsValid,
  renderError,
  renderInfo,
  renderSucceed,
  spinner,
  sync,
} from "../src/utils";
import runCommand from "../src/utils/run-command";

jest.mock("../src/utils/run-command", () =>
  jest.requireActual("../__mocks__/run-command.js")
);

describe("Unit test for render utils", () => {
  it("Should call chalk with correct arguments", () => {
    const error = "error";
    const info = "info";
    const succeed = "succeed";

    renderInfo(info);
    expect(chalk.cyan).toHaveBeenLastCalledWith(`${prefix} ${info}`);

    renderSucceed(succeed);
    expect(chalk.green).toHaveBeenLastCalledWith(`${prefix} ${succeed}`);

    renderError(error);
    expect(chalk.red).toHaveBeenLastCalledWith(`${prefix} ${error}`);
  });
});

describe("Unit test for spinner", () => {
  let oraOra: ora.Ora;
  let calledAmount: number;
  const testStr = "test text";

  beforeEach(() => {
    calledAmount = (ora().start as any).mock.calls.length;
    oraOra = spinner(testStr);
  });

  it("Should start an ora.Ora process", () => {
    expect(ora().start).toHaveBeenCalledTimes(calledAmount + 1);
  });

  it("Should call with correct argument", () => {
    expect(chalk.cyan).toHaveBeenLastCalledWith(testStr);
    expect(ora).toHaveBeenLastCalledWith({
      color: "cyan",
      text: chalk.cyan(testStr),
    });
  });

  it("Should return current ora.Ora instance", () => {
    expect(typeof oraOra.stop).toBe("function");
    expect(typeof oraOra.fail).toBe("function");
    expect(typeof oraOra.succeed).toBe("function");
    expect(typeof oraOra.start).toBe("function");
  });
});

describe("Unit test for ifExistGH", () => {
  let calledAmount: number;
  let spyWrite: jest.SpyInstance;

  beforeEach(async () => {
    try {
      spyWrite = jest
        .spyOn(global.process.stdout, "write")
        .mockImplementation();
      await ifExistGH();
    } catch (e) {
      /* handle error */
    }
  });

  afterEach(() => spyWrite.mockRestore());

  it("Should call with correct arguments", () => {
    expect(commandExists).toHaveBeenLastCalledWith("gh");
  });

  it("Should print correct error message", () => {
    calledAmount = (process.stdout.write as any).mock.calls.length;

    expect(
      (process.stdout.write as any).mock.calls[calledAmount - 1][0]
    ).toMatchSnapshot();
  });
});

describe("Unit test for ifLoginGH", () => {
  let calledAmount: number;
  let spyWrite: jest.SpyInstance;

  beforeEach(async () => {
    try {
      spyWrite = jest
        .spyOn(global.process.stdout, "write")
        .mockImplementation();
      await ifLoginGH();
    } catch (e) {
      /* handle error */
    }
  });

  afterEach(() => spyWrite.mockRestore());

  it("Should call with correct arguments", () => {
    expect(runCommand).toHaveBeenLastCalledWith(`gh auth status`);
  });

  it("Should print correct error message", () => {
    calledAmount = (process.stdout.write as any).mock.calls.length;
    expect(
      (process.stdout.write as any).mock.calls[calledAmount - 1][0]
    ).toMatchSnapshot();
  });
});

describe("Unit test for sync", () => {
  let spyWrite: jest.SpyInstance;

  beforeEach(async () => {
    spyWrite = jest.spyOn(global.process.stdout, "write").mockImplementation();
  });

  afterEach(() => spyWrite.mockRestore());

  it("Should call runCommand with correct argument", async () => {
    await sync("test/testRepo");
    expect(runCommand).toHaveBeenLastCalledWith(`gh repo sync test/testRepo`);
  });

  it("Should start an ora.Ora process", async () => {
    const calledAmountForOraStart = (ora().start as any).mock.calls.length;
    await sync("test/testRepo");
    expect(ora().start).toHaveBeenCalledTimes(calledAmountForOraStart + 1);
  });

  it("Should throw error when repo name invalid", async () => {
    await sync("hello");
    const calledAmountForWrite = (process.stdout.write as any).mock.calls
      .length;
    expect(
      (process.stdout.write as any).mock.calls[calledAmountForWrite - 1][0]
    ).toMatchSnapshot();
  });

  it("Should stop the ora.Ora process when succeed", async () => {
    const calledAmountForOraStart = (ora().stop as any).mock.calls.length;
    await sync("test/testRepo");
    expect(ora().stop).toHaveBeenCalledTimes(calledAmountForOraStart + 1);
    expect(ora().succeed).toHaveBeenLastCalledWith(
      `${prefix} Done for test/testRepo\n`
    );
  });

  it("Should stop the ora.Ora process when fail", async () => {
    const calledAmountForOraStart = (ora().stop as any).mock.calls.length;
    await sync("hello");
    expect(ora().stop).toHaveBeenCalledTimes(calledAmountForOraStart + 1);
    expect(ora().fail).toHaveBeenLastCalledWith(`${prefix} Failed for hello\n`);
  });
});

describe("Unit test for isAllArgsValid", () => {
  it("Should return true when all arguments are valid", () => {
    expect(isAllArgsValid(["test/testRepo", "hello/helloRepo"])).toBeTruthy();
  });

  it("Should return false when repo name invalid", () => {
    expect(isAllArgsValid(["test/testRepo", "hello"])).toBeFalsy();
  });
});
