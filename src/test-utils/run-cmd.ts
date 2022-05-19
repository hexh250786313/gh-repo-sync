import { execSync } from "child_process";

export function runCmd(cmd: string, env?: boolean) {
  let result;
  try {
    const customEnv = env ? { env: { ...process.env } } : {};

    result = execSync(cmd, { cwd: process.cwd(), ...customEnv });
  } catch (error) {
    throw new Error((error as any).output.toString());
  }

  return result.toString();
}
