import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

// Hooks
import { useFetchData } from '../../hooks/useFetchData';

// Components
import { PostCard } from '../../components/Posts/PostCard';

// interfaces
import { IPost } from '../../interfaces/Post';

import { PostContext } from '../../context/PostContext';

export const Posts = () => {
  const [posts, setPosts] = useState<Array<IPost>>();
  const context = useContext(PostContext);

  const { data, loading } = useFetchData('/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, posts, context?.posts]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="card_container">
      {posts &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            created_at={post.created_at}
          />
        ))}
      <Link to="/post/create" className="btn plus">
        <FaPlus />
      </Link>
    </div>
  );
};
