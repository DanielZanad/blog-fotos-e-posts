import React from 'react';
import { Link } from 'react-router-dom';

// Css
import styles from './index.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/posts" className="btn">
        Posts
      </Link>
      <Link to="/photos" className="btn">
        Fotos
      </Link>
    </nav>
  );
};
