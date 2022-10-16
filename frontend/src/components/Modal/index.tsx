import React from 'react';
import { useNavigate } from 'react-router-dom';

// Css
import styles from './index.module.css';

type Props = {
  titleMessage: string;
  bodyMessage: string;
};

export const Modal = ({ titleMessage, bodyMessage }: Props) => {
  const navigate = useNavigate();

  const closeModal = (): void => {
    const modal = document.querySelector('#modal');
    modal?.classList.add('hide');
  };

  const handleProceed = () => {
    navigate('/posts');
    closeModal();
  };

  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h2>{titleMessage}</h2>
        <div>{bodyMessage}</div>
        <button className="btn" onClick={handleProceed}>
          Entendi!
        </button>
      </div>
    </div>
  );
};
