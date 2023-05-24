import { Article, Video } from "./index";
export enum DecisionTreeNodeType {
  Article,
  Video,
  Question,
  Answer,
  Email,
  Phone,
}

export interface IDecisionTreeNode {
  id: string;
  xPosition: number;
  yPosition: number;
  text: string | null;
  parentId: string | null;
  type: DecisionTreeNodeType;
  article: Article | null;
  video: Video | null;
  phone: string | null;
  email: string | null;
  children: IDecisionTreeNode[];
}

export interface DecisionTree {
  id: string;
  name: string;
  root: IDecisionTreeNode;
  loaded?: boolean;
}

export class DecisionTreeNode {
  id: string;
  x: number;
  y: number;
  text: string | null;
  parent: DecisionTreeNode | null;
  type: DecisionTreeNodeType;
  article: Article | null;
  video: Video | null;
  phone: string | null;
  email: string | null;
  children?: IDecisionTreeNode[] | undefined;
  locked: false;
  hover: false;

  constructor(data: any) {
    const {
      id,
      x,
      y,
      text,
      parent,
      type,
      article,
      video,
      phone,
      email,
      children,
    } = data;
    this.id = id;
    this.text = text;
    this.type = type;
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.article = article;
    this.video = video;
    this.phone = phone;
    this.email = email;
    this.children = children;
    this.hover = false;
    this.locked = false;
  }
}
