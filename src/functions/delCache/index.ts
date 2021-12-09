import { LiftoffEnv } from "liftoff";
import { join } from "path";
import { delRequireCache } from "delete-node-require-cache";

export const delCache = async () => {
  const liftEnv: LiftoffEnv = globalThis._cliLiftEnv || {};
  const { cwd } = liftEnv;
  const file = join(cwd, "index.js");
  const files =  delRequireCache(file);
  console.log(files, 'files')
};
