import { existsSync, readJsonSync } from "fs-extra";
import { resolve } from "path";
import { homedir } from "os";

const _pkg = readJsonSync(resolve(__dirname, "../package.json"));

const _fileConfig = (() => {
  const path = `${homedir()}/.config/gh-repo-sync/config.json`;
  if (existsSync(path)) {
    const obj = readJsonSync(path);
    return Array.isArray(obj?.repos) ? obj?.repos : [];
  }
  return [];
})();

const _toolName = _pkg.name;
const _prefix = `[${_toolName}]`;

export const pkg = _pkg;
export const toolName = _toolName;
export const prefix = _prefix;
export const fileConfig = _fileConfig;
