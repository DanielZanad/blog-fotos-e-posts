import React from 'react';

export interface IPost {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

export interface IStorePost {
  title: string;
  body: string;
}

export type PostContextType = {
  posts: IPost[];
  setPost: React.Dispatch<React.SetStateAction<IPost[]>>;
};
