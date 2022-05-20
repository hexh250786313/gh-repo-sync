import chalk from "chalk";
import { prefix } from "../constants";

export default function (infoText: string) {
  return chalk.cyan(`${prefix} ${infoText}`);
}
