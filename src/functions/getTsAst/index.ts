import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { LiftoffEnv } from "liftoff";
import fsUtil from "ginlibs-file-util";
import cache from "ginlibs-cache";
import { join } from "path";
import { sleep } from "ginlibs-utils";

export const getTsAst = async () => {
  const liftEnv: LiftoffEnv = globalThis._cliLiftEnv || {};
  const { cwd } = liftEnv;
  const code = fsUtil.read(
    "/Users/madao/Documents/project/ginlibs-seibasi/src/functions/getTsAst/codeExample/index.ts"
  );
  console.log(code, "code");
  const ast = parser.parse(code, {
    plugins: ["typescript"],
  });
  console.log(ast, "ast");
  traverse(ast, {
    VariableDeclaration(path: any) {
      console.log(path, "path");
    },
  });
  await sleep(100000 * 1000);
};
