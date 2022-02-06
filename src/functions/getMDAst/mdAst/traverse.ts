import { NodeType } from "./types";
import { isFunc, isObject, isArray } from "ginlibs-type-check";
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
  const info: any = {
    pathStr: "",
    parent: null,
  };

  const travNodes = (node: any, info: any) => {
    const children: any[] = node.children || [];
    if (!isArray(children) || children.length <= 0) {
      return;
    }
    for (let i = 0; i < children.length; i++) {
      const it = children[i];

      if (!it) {
        continue;
      }
      const itPath = `${info?.path || ""}.children[${i}]`;
      const travInfo = {
        index: i,
        parent: node,
        parentPath: info?.path || "",
        path: itPath,
        curList: children,
      };
      checkNode(it, info, travInfo);
    }
  };

  const checkNode = (node: any, info: any, travInfo: any = {}) => {
    if (!node || !node.type || global.stop === true) {
      return;
    }
    const type = node?.type;
    const nodePathStr =
      travInfo.path || `${info.path ? info.path + "." + type : type || ""}`;
    const curInfo = {
      ...info,
      ...travInfo,
      type,
      path: nodePathStr,
    };

    if (!travTypes.includes(type)) {
      return travNodes(node, curInfo);
    }
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
    const nPath = new NodePath(node, curInfo, global);
    enter(nPath);
    travNodes(node, curInfo);
    exit(nPath);
  };

  checkNode(node, info);
};
