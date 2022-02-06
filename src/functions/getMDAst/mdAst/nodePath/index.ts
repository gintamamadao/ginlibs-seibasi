export class NodePath {
  public node: any;
  private nodeInfo: any;
  private globalInfo: any;
  constructor(node: any, nodeInfo: any, globalInfo: any) {
    this.node = node;
    this.nodeInfo = nodeInfo;
    this.globalInfo = globalInfo;
  }

  private getIndex = () => {
    const { curList, node, index } = this.nodeInfo;
    if (curList[index] === node) {
      return index;
    }
    const newIndex = curList.findIndex((it) => {
      return it === node;
    });
    if (newIndex >= 0) {
      this.nodeInfo = newIndex;
    } else {
      return null;
    }
    return this.nodeInfo.index;
  };

  remove = () => {
    if (this.nodeInfo.deleted) {
      return;
    }
    const index = this.getIndex();
    if (!index) {
      return;
    }
    this.nodeInfo.curList?.splice?.(index, 1);
    this.nodeInfo.deleted = true;
  };
}
