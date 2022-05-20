import chalk from "chalk";
import { prefix } from "../constants";

export default function (succeedText: string) {
  return chalk.green(`${prefix} ${succeedText}`);
}
