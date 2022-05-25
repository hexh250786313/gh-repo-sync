import { prefix } from "../constants";
import { renderError, renderSucceed, runCommand, spinner } from "./";

/** sync
 * @desc Runs "gh sync repo owner/repo"
 *  */
export default async function sync(repo: string) {
  const stepName = `${prefix}Running "gh repo sync ${repo}"`;
  const step = spinner(`${stepName}...`);

  try {
    process.stdout.write("\n");
    // await runCommand(`echo "hello"`);
    await runCommand(`gh repo sync ${repo}`);
    step
      .stop()
      .succeed(
        renderSucceed("Done for " + `https://github.com/${repo}` + "\n")
      );
  } catch (e) {
    step.stop().fail(renderError(`Failed for https://github.com/${repo}\n`));
    process.stdout.write(`${e}\n-----------------------------\n\n`);
  }
}
