import React, { createContext, useState } from 'react';
import { IPost, PostContextType } from '../interfaces/Post';

export const PostContext = createContext<PostContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const PostContextProvider = ({ children }: Props) => {
  const [posts, setPost] = useState<Array<IPost>>([]);

  return (
    <PostContext.Provider value={{ posts, setPost }}>
      {children}
    </PostContext.Provider>
  );
};
