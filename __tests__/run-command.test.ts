import { runCommand } from "../src/utils";

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
