import chalk from "chalk";
import ora from "ora";

/** runCommand
 * @desc Starts a spinner with the given message
 *  */
export default function (text: string) {
  const s = ora({
    color: "cyan",
    text: chalk.cyan(text),
  });
  s.start();
  return s;
}
