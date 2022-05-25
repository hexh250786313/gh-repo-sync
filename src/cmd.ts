import { program } from "commander";
import {
  ifExistGH,
  ifLoginGH,
  isAllArgsValid,
  renderError,
  renderInfo,
  sync,
} from "./utils";
import { fileConfig, pkg } from "./constants";

program
  .version(pkg.version, "-v, --version")
  .usage(
    `[ -h | --help ] [ -v | --version ] [ 'owner/repo1' 'owner/repo2' ... ]\n
       You can configure a config file in \`~/.config/gh-repo-sync/config.json\` to help specify repos so that you are not required to pass the arguments.\n
       See more in https://github.com/hexh250786313/gh-repo-sync#readme.`
  )
  .parse(process.argv);

export async function run() {
  process.stdout.write(renderInfo("Processing...\n"));
  let pendingRepos: string[] | undefined = undefined;

  const configRepos: string[] = fileConfig;

  try {
    await ifExistGH();
    await ifLoginGH();

    if (Array.isArray(program.args) && program.args.length > 0) {
      pendingRepos = program.args;
    } else if (Array.isArray(configRepos) && configRepos.length > 0) {
      pendingRepos = configRepos;
    }

    if (isAllArgsValid(pendingRepos)) {
      Promise.all(
        pendingRepos.map(async (repo) => {
          await sync(repo);
        })
      );
      process.stdout.write("\n");
    } else {
      throw new Error(
        "\n\n" +
          (Array.isArray(pendingRepos)
            ? `Check the args: ${(pendingRepos as any).join(" ")}\n`
            : "") +
          "Please specify at least one valid repo name like: hexh250786313/gh-repo-sync. Or you can configure a config file locally: ~/.config/gh-repo-sync/config.json" +
          "\n"
      );
    }
  } catch (e: any) {
    if (e.message) {
      process.stdout.write(renderError(e as string) + "\n");
    }
    process.stdout.write("See: gh-repo-sync --help" + "\n\n");
  }
}
