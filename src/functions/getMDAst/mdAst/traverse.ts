import { NodeType } from "./types";
import { isFunc } from "ginlibs-type-check";

export type Options = {
  [p in NodeType]?: (path: any) => void;
};

export type OptionsEE = {
  [p in NodeType]?: {
    enter?: (path: any) => void;
    exit?: (path: any) => void;
  };
};

type AnyFunction = (...args: any[]) => any;

const noop: AnyFunction = () => undefined;

export const traverse = (node: any, options: Options | OptionsEE) => {
  const type = node.type || "root";
  const children = node.children || [];
  const opts: any = options;
  const travTypes = Object.keys(opts);
  let enter = noop;
  let exit = noop;
  if (isFunc(opts)) {
    enter = opts;
  } else if (isFunc(opts.enter)) {
    enter = opts.enter;
  }
  if (isFunc(opts.exit)) {
    exit = opts.exit;
  }

  const checkNode = (node: any, options: Options | OptionsEE) => {
    const type = node?.type || "root";
    if (!node || !node.type || !travTypes.includes(type)) {
      return;
    }
    const children = node.children || [];
  };
};
