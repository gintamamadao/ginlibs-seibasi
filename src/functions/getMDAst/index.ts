import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { LiftoffEnv } from "liftoff";
import fsUtil from "ginlibs-file-util";
import { toAst } from "md-ast-traverse";
import { sleep } from "ginlibs-utils";

export const getMDAst = async () => {
  const liftEnv: LiftoffEnv = globalThis._cliLiftEnv || {};
  const { cwd } = liftEnv;
  const code = fsUtil.read(
    "/Users/madao/project/ginlibs-seibasi/src/functions/getMDAst/mdExample/note.md"
  );
  console.log(code, "code");
  const ast = toAst(code);
  console.log(ast, "ast");
  await sleep(100000 * 1000);
};
