import React from 'react';
import { Link } from 'react-router-dom';

// Css
import styles from './index.module.css';

// Interfaces
import { IPost } from '../../../interfaces/Post';

type PostProps = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export const PostCard = ({ id, title, body, created_at }: PostProps) => {
  return (
    <div className={styles.card_post}>
      <h2>{title}</h2>
      <p>{created_at}</p>
      <Link to={`/post/${id}`} className="btn">
        Saiba mais
      </Link>
    </div>
  );
};
