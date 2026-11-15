import type { userI } from "./userI";

export interface CommentI {
  _id: string;
  content: string;
  commentCreator: userI;
  post: string;
  createdAt: string;
}
