import { exec, ExecOptions } from "child_process";
import { platform } from "os";

/** runCommand
 * @desc Runs a command in the shell
 *  */
export default function (
  /** The command to run */
  cmd: string,
  /** Options to pass to exec */
  opts: ExecOptions = {},
  /** Timeout in milliseconds */
  timeout?: number
): Promise<string> {
  if (platform() === "win32") {
    opts.shell = opts.shell || process.env.SHELL;
  }
  opts.maxBuffer = 500 * 1024;
  return new Promise<string>((resolve, reject) => {
    let timer: NodeJS.Timer;
    if (timeout) {
      timer = setTimeout(() => {
        reject(new Error(`timeout after ${timeout}s`));
      }, timeout * 1000);
    }
    exec(cmd, opts, (err, stdout, stderr) => {
      if (timer) clearTimeout(timer);
      if (err) {
        reject(new Error(`exited with ${err.code}\n${err}\n${stderr}`));
        return;
      }
      // @todo: dev code
      resolve(stdout);
      // const n = Math.random();
      // setTimeout(() => {
      // n > 0.5 ? resolve(stdout) : reject(new Error("hello"));
      // }, n * 10000);
    });
  });
}
