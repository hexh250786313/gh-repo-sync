import { program } from "commander";
import {
  ifExistGH,
  ifLoginGH,
  isAllArgsValid,
  renderError,
  renderInfo,
  sync,
} from "./utils";
import { pkg } from "./constants";

program
  .version(pkg.version, "-v, --version")
  .usage("[options]")
  .option("-s, --string <your string>", "Set your string")
  .parse(process.argv);

export async function run() {
  process.stdout.write(renderInfo("Processing...\n"));
  let pendingRepos: string[];

  const configRepos = [
    "hexh250786313/coc-symbol-line",
    "hexh250786313/coc-yank",
    "hexh250786313/coc-git",
  ];

  try {
    if (Array.isArray(program.args)) {
      if (isAllArgsValid(program.args)) {
        pendingRepos = program.args;
      } else {
        throw new Error(
          "Please specify valid repos like: hexh250786313/gh-sync-repo"
        );
      }
    } else if (configRepos && configRepos.length > 0) {
      pendingRepos = program.args;
    } else {
      throw new Error(
        "Please specify a valid repo or configure a valid config file, see --help"
      );
    }

    await ifExistGH();
    await ifLoginGH();
    Promise.all(
      pendingRepos.map(async (repo) => {
        await sync(repo);
      })
    );
    process.stdout.write("\n");
  } catch (e: any) {
    if (e.message) {
      process.stdout.write(renderError(e as string) + "\n");
    }
  }
}
