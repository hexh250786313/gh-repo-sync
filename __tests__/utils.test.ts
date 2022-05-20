import chalk from "chalk";
import { prefix } from "../src/constants";
import {
  renderError,
  renderInfo,
  renderSucceed,
  runCommand,
} from "../src/utils";

describe("Unit test for utils", () => {
  test("Should throw on command error", async () => {
    let err: unknown;
    try {
      await runCommand("command_not_exists", { cwd: __dirname });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });

  test("Should run command with timeout", async () => {
    let err: unknown;
    try {
      await runCommand("sleep 2", { cwd: __dirname }, 0.01);
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });

  test("Should call chalk with corrent arguments", () => {
    const error = "error";
    const info = "info";
    const succeed = "succeed";

    renderInfo(info);
    expect(chalk.cyan).toHaveBeenCalledWith(`${prefix} ${info}`);

    renderSucceed(succeed);
    expect(chalk.green).toHaveBeenCalledWith(`${prefix} ${succeed}`);

    renderError(error);
    expect(chalk.red).toHaveBeenCalledWith(`${prefix} ${error}`);
  });

  test("Should start an ora process", () => {
    //
  });

  test("Should call ora with corrent argument", () => {
    //
  });
});
