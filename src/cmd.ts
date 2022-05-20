import { program } from "commander";
import commandExists from "command-exists";
import { renderError, renderInfo, sync } from "./utils";
import { pkg } from "./constants";

program
  .version(pkg.version, "-v, --version")
  .usage("[options]")
  .option("-s, --string <your string>", "Set your string")
  .parse(process.argv);

export async function run() {
  console.log(renderInfo("Processing..."));

  const pendingRepos = [
    "hexh250786313/coc-symbol-line",
    "hexh250786313/coc-yank",
    "hexh250786313/coc-git",
  ];

  try {
    await commandExists("gh")
      .then(() => {
        Promise.all(
          pendingRepos.map(async (repo) => {
            await sync(repo);
          })
        );
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
    console.log(renderError(e as string));
  }
}
