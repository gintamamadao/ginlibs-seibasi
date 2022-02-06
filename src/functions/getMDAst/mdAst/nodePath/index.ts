export class NodePath {
  public node: any;
  public nodeInfo: any;
  public globalInfo: any;
  constructor(node: any, nodeInfo: any, globalInfo: any) {
    this.node = node;
    this.nodeInfo = nodeInfo;
    this.globalInfo = globalInfo;
  }
}
