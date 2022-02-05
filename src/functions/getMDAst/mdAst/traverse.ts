import { NodeType } from "./types";
import { isFunc, isObject } from "ginlibs-type-check";
import { NodePath } from "./nodePath";

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
  if (!options || !isObject(options)) {
    return;
  }
  const opts: any = options;
  const travTypes = Object.keys(opts);

  const travNodes = (node: any) => {
    const children = node.children || [];
    for (const it of children) {
      checkNode(it);
    }
  };

  const checkNode = (node: any) => {
    if (!node || !node.type) {
      return;
    }
    const type = node?.type;
    console.log(node, "dsaf");
    // if (!travTypes.includes(type)) {
    //   return travNodes(node);
    // }
    const handleOpts = opts[type];
    let enter = noop;
    let exit = noop;
    if (isFunc(handleOpts)) {
      enter = handleOpts;
    } else if (handleOpts && isFunc(handleOpts.enter)) {
      enter = handleOpts.enter;
    }
    if (isFunc(handleOpts && handleOpts.exit)) {
      exit = handleOpts.exit;
    }
    const nPath = new NodePath(node);
    enter(nPath);
    travNodes(node);
    exit(nPath);
  };

  checkNode(node);
};
