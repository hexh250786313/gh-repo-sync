import runCommand from "./run-command";

/** ifLoginGH
 * @desc if the user is logged in
 *  */
export default async function () {
  try {
    await runCommand(`gh auth status`);
  } catch (error: any) {
    process.stdout.write(
      "\n" +
        "You are not logged into any GitHub hosts. Run `gh auth login` to authenticate.\n" +
        "\n"
    );
    throw new Error();
  }
}
