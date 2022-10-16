import React, { FormEvent, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useDeleteData } from '../../hooks/useDeleteData';
import { useFetchDataById } from '../../hooks/useFetchDataById';

import { IPost } from '../../interfaces/Post';

interface CreatePostProps {
  setModalTitleMessage: React.Dispatch<React.SetStateAction<string>>;
  setModalBodyMessage: React.Dispatch<React.SetStateAction<string>>;
}

const EditPost = ({
  setModalTitleMessage,
  setModalBodyMessage,
}: CreatePostProps) => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | undefined>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { data, loading } = useFetchDataById('/posts', id);
  const { deleteData, response } = useDeleteData();
  const navigate = useNavigate();

  useEffect(() => {
    setPost(data);
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [data]);

  if (loading) return <p>Carregando...</p>;

  const handleDelete = () => {
    deleteData('/posts', id);
    if (response.error === null) {
      navigate('/posts');
      const modal = document.querySelector('#modal');
      setModalTitleMessage('Post Deletado');
      setModalBodyMessage('Post foi deletado com sucesso');
      modal?.classList.remove('hide');
    } else {
      navigate('/posts');
      const modal = document.querySelector('#modal');
      setModalTitleMessage(response.error);
      setModalBodyMessage(response.error);
      modal?.classList.remove('hide');
    }
  };

  return (
    <div className="form_container">
      <form className="form">
        <label htmlFor="title">
          <input
            type="text"
            required
            name="title"
            id="title"
            placeholder="titulo do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="body">
          <textarea
            name="body"
            id="body"
            placeholder="Corpo do post"
            cols={80}
            rows={15}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <div className="btn_container_form">
          {!response.loading && <button className="btn">Editar</button>}
          {response.loading && <button className="btn">Aguarde...</button>}
          <button className="btn" onClick={handleDelete}>
            Deletar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
