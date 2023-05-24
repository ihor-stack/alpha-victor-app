import { Article, Video } from "./index";
export enum DecisionTreeNodeType {
  Article,
  Video,
  Question,
  Answer,
  Email,
  Phone,
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
  article: Article | null = null;
  video: Video | null = null;
  phone: string | null = null;
  email: string | null = null;

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
