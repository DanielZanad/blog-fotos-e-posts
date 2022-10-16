import React, { FormEvent, useState } from 'react';
import { useStoreData } from '../../hooks/useStoreData';

// interfaces
import { IPost } from '../../interfaces/Post';

// Components
import { Modal } from '../../components/Modal';

interface CreatePostProps {
  setModalTitleMessage: React.Dispatch<React.SetStateAction<string>>;
  setModalBodyMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const CreatePost = ({
  setModalTitleMessage,
  setModalBodyMessage,
}: CreatePostProps) => {
  const [post, setPost] = useState<IPost>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { storeData, response } = useStoreData();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert('Titulo esta vazio');
    }
    if (!body) {
      alert('Corpo esta vazio');
    }
    storeData('/posts', { title, body });
    if (response.error === null) {
      const modal = document.querySelector('#modal');
      setModalTitleMessage('Post Salvo');
      setModalBodyMessage('Post foi inserido com sucesso');
      modal?.classList.remove('hide');
    }
  };

  return (
    <div className="form_container">
      {/* <Modal bodyMessage="Qualquer coisa" titleMessage="Qulaquer" /> */}
      <form onSubmit={handleSubmit} className="form">
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
            required
            placeholder="Corpo do post"
            cols={80}
            rows={15}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <div className="btn_container_form">
          {!response.loading && <button className="btn">Salvar</button>}
          {response.loading && <button className="btn">Aguarde...</button>}
        </div>
      </form>
    </div>
  );
};
