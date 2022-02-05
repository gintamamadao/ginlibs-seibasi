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

  const global = {
    stop: false,
  };
  const info = {
    pathStr: "",
    parent: null,
  };

  const travNodes = (node: any, info: any) => {
    const children = node.children || [];
    for (const it of children) {
      checkNode(it, info);
    }
  };

  const checkNode = (node: any, info: any) => {
    if (!node || !node.type || global.stop === true) {
      return;
    }
    const type = node?.type;
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
    const curInfo = {
      ...info,
      path: "",
    };
    const nPath = new NodePath(node);
    enter(nPath);
    travNodes(node, curInfo);
    exit(nPath);
  };

  checkNode(node, info);
};
