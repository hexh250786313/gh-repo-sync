import chalk from "chalk";
import { prefix } from "../constants";

export default function (errText: string) {
  return chalk.red(`${prefix} ${errText}`);
}
