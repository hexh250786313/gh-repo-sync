import { readJsonSync } from "fs-extra";
import { resolve } from "path";
import { program } from "commander";
import runCommand from "./utils/run-command";
import ora from "ora";
import { dots } from "cli-spinners";
import chalk from "chalk";
import commandExists from "command-exists";

const pkg = readJsonSync(resolve(__dirname, "../package.json"));

const toolName = pkg.name;
const prefix = `[${toolName}]`;

program
  .version(pkg.version, "-v, --version")
  .usage("[options]")
  .option("-s, --string <your string>", "Set your string")
  .parse(process.argv);

const spinner = (text: string) => {
  const s = ora({
    spinner: dots,
    color: "cyan",
    text: chalk.cyan(text),
  });
  s.start();
  return s;
};

const renderError = (errText: string) => {
  return chalk.red(`${prefix} ${errText}`);
};

const renderInfo = (infoText: string) => {
  return chalk.cyan(`${prefix} ${infoText}`);
};

const renderSucceed = (succeedText: string) => {
  return chalk.green(`${prefix} ${succeedText}`);
};

export async function sync(repo: string) {
  // const { str } = program.opts();

  // program.command();

  const stepName = `Running "gh repo sync ${repo}"`;
  const step = spinner(`${stepName}...`);

  step.start();

  try {
    await runCommand(`echo "hello"`);
    // await runCommand(`gh repo sync ${repo}`);
    step.stop().succeed(renderSucceed("Done for " + repo));
  } catch (e) {
    step.stop().fail(renderError(`Failed for ${repo}\n${e}`));
  }
}

export async function run() {
  console.log(renderInfo("Processing..."));

  const pendingRepos = [
    "hexh250786313/coc-symbol-line",
    "hexh250786313/coc-yank",
    "hexh250786313/coc-git",
  ];

  try {
    await commandExists("gh")
      .then(async () => {
        await sync(pendingRepos[0]);
        await sync(pendingRepos[1]);
        await sync(pendingRepos[2]);
      })
      .catch(() => {
        console.log("");
        console.log(
          renderError("Error: Command failed: gh: command not found")
        );
        console.log(
          `\nPlease make sure you have github-cli installed: https://github.com/cli/cli#installation`
        );
      });
    console.log("");
  } catch (e) {
    ora(renderError(e as string));
  }
}
