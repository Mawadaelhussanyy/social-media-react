import type { userI } from "./userI";

export interface Post {
  _id: string;
  body: string;
  image: string;
  privacy: "public";
  user: userI;
  sharedPost: null;
  likes: unknown[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShared: boolean;
  shares: boolean;
  bookmarked: boolean;
}