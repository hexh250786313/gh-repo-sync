import { prefix } from "../constants";
import renderError from "./render-error";
import renderSucceed from "./render-succeed";
import runCommand from "./run-command";
import spinner from "./spinner";

export default async function sync(repo: string) {
  // const { str } = program.opts();

  // program.command();

  const stepName = `${prefix}Running "gh repo sync ${repo}"`;
  const step = spinner(`${stepName}...`);

  step.start();

  try {
    console.log("");
    await runCommand(`echo "hello"`);
    // await runCommand(`gh repo sync ${repo}`);
    step.stop().succeed(renderSucceed("Done for " + repo));
  } catch (e) {
    step.stop().fail(renderError(`Failed for ${repo}\n${e}`));
  }
}
