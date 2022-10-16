import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Css
import './App.css';

// Hooks
import { useFetchData } from './hooks/useFetchData';

// Context
import { PostContext } from './context/PostContext';

// Pages
import { CreatePost } from './pages/CreatePost/CreatePost';
import { Posts } from './pages/Posts/Posts';

// Components
import { Navbar } from './components/Navbar';
import EditPost from './pages/EditPost/EditPost';
import { Modal } from './components/Modal';

function App() {
  const context = useContext(PostContext);
  const [modalTitleMessage, setModalTitleMessage] = useState('');
  const [modalBodyMessage, setModalBodyMessage] = useState('');
  const { data, loading, error } = useFetchData('/posts');

  useEffect(() => {
    if (data) {
      context?.setPost(data);

      console.log(context?.posts);
    }
  }, [data]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="App">
      <BrowserRouter>
        <Modal bodyMessage={modalBodyMessage} titleMessage={modalTitleMessage} />
        <Navbar />
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/post/create"
            element={
              <CreatePost
                setModalTitleMessage={setModalTitleMessage}
                setModalBodyMessage={setModalBodyMessage}
              />
            }
          />
          <Route
            path="/post/:id"
            element={
              <EditPost
                setModalTitleMessage={setModalTitleMessage}
                setModalBodyMessage={setModalBodyMessage}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
