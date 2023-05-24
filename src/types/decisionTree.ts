export enum DecisionTreeNodeType {
  Article,
  Video,
  Question,
  Answer,
  Email,
  Phone,
  Document,
}

export class DecisionTreeNode {
  id: string;
  text: string;
  type: DecisionTreeNodeType;
  x: number;
  y: number;
  parent: DecisionTreeNode;
  children: any[];
  hover = false;
  locked = false;

  constructor(
    id: string,
    text: string,
    type: DecisionTreeNodeType,
    x: number,
    y: number,
    parent: DecisionTreeNode,
    children: any[],
    locked = false
  ) {
    this.id = id;
    this.text = text;
    this.type = type;
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.children = children;
    this.hover = false;
    this.locked = locked;
  }
}
