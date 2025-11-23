export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  aspectRatio: string; // 'aspect-video' | 'aspect-square' | 'aspect-[3/4]'
}

export enum ViewState {
  FEED = 'FEED',
  PROFILE = 'PROFILE',
  CREATE = 'CREATE' // Modal overlay
}