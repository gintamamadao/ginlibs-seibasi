import { resolve, dirname, extname } from "path";
import fsUtil from "ginlibs-file-util";
import validateNpm from "validate-npm-package-name";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { LiftoffEnv } from "liftoff";
import { join } from "path";
import { sleep } from "ginlibs-utils";
import { delRequireCache } from "delete-node-require-cache";

export const delCache = async () => {
  const liftEnv: LiftoffEnv = globalThis._cliLiftEnv || {};
  const { cwd } = liftEnv;
  const file = join(cwd, "index.js");
  delRequireCache(file);
};
