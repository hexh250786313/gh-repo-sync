import { readJsonSync } from "fs-extra";
import { resolve } from "path";

const _pkg = readJsonSync(resolve(__dirname, "../package.json"));

const _toolName = _pkg.name;
const _prefix = `[${_toolName}]`;

export const pkg = _pkg;
export const toolName = _toolName;
export const prefix = _prefix;
