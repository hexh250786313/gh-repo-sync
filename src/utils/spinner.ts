import chalk from "chalk";
import ora from "ora";
import { dots } from "cli-spinners";

export default function (text: string) {
  const s = ora({
    spinner: dots,
    color: "cyan",
    text: chalk.cyan(text),
  });
  s.start();
  return s;
}
