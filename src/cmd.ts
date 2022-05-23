import { program } from "commander";
import { ifExistGH, ifLoginGH, renderError, renderInfo, sync } from "./utils";
import { pkg } from "./constants";

program
  .version(pkg.version, "-v, --version")
  .usage("[options]")
  .option("-s, --string <your string>", "Set your string")
  .parse(process.argv);

export async function run() {
  process.stdout.write(renderInfo("Processing...\n"));

  const pendingRepos = [
    "hexh250786313/coc-symbol-line",
    "hexh250786313/coc-yank",
    "hexh250786313/coc-git",
  ];

  try {
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
