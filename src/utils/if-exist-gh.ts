import commandExists from "command-exists";
import renderError from "./render-error";

/** ifExistGH
 * @desc if exist gh command
 *  */
export default async function () {
  try {
    await commandExists("gh");
  } catch (error: any) {
    process.stdout.write(
      "\n" +
        renderError(`Error: Command failed: gh: command not found\n`) +
        "\n" +
        "Please make sure you have github-cli installed: https://github.com/cli/cli#installation\n" +
        "\n"
    );
    throw new Error();
  }
}
