import { exec, ExecOptions } from "child_process";
import { platform } from "os";

export default function (
  cmd: string,
  opts: ExecOptions = {},
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
      // setTimeout(() => {
      // Math.random() > 0.5 ? resolve(stdout) : reject(new Error("hello"));
      // }, 1000);
    });
  });
}
