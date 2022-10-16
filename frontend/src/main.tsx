import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PostContextProvider } from './context/PostContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PostContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PostContextProvider>,
);
