export interface StyleModel {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUri: string;
  description: string;
  likeCount: number;
  commentCount: number;
  taggedProductIds: string[];
  createdAt: string;
  isLiked: boolean;
}
