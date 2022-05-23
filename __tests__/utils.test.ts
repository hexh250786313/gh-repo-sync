import chalk from "chalk";
import commandExists from "command-exists";
import ora from "ora";
import { prefix } from "../src/constants";
import {
  ifExistGH,
  ifLoginGH,
  renderError,
  renderInfo,
  renderSucceed,
  runCommand,
  spinner,
  sync,
} from "../src/utils";

const spyWrite = jest
  .spyOn(global.process.stdout, "write")
  .mockImplementation();

describe("Unit test for runCommand", () => {
  it("Should throw on command error", async () => {
    let err: unknown;
    try {
      await runCommand("command_not_exists", { cwd: __dirname });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });

  it("Should run command with timeout", async () => {
    let err: unknown;
    try {
      await runCommand("sleep 2", { cwd: __dirname }, 0.01);
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });
});

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

  beforeEach(async () => {
    try {
      await ifExistGH();
    } catch (e) {
      /* handle error */
    }
  });

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

  beforeEach(async () => {
    try {
      await ifLoginGH();
    } catch (e) {
      /* handle error */
    }
  });

  // @todo:
  // it("Should call with correct arguments", () => {
  // expect(runCommand).toHaveBeenLastCalledWith(`gh auth status`);
  // });

  it("Should print correct error message", () => {
    calledAmount = (process.stdout.write as any).mock.calls.length;
    expect(
      (process.stdout.write as any).mock.calls[calledAmount - 1][0]
    ).toMatchSnapshot();
    spyWrite.mockRestore();
  });
});

describe("Unit test for sync", () => {
  let calledAmount: number;
  beforeEach(async () => {
    calledAmount = (ora().start as any).mock.calls.length;
    try {
      await sync("");
    } catch (err) {
      // No handler needed
    }
  });

  it("Should start an ora.Ora process", () => {
    expect(ora().start).toHaveBeenCalledTimes(calledAmount + 1);
  });
});
