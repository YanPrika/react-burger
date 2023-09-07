import React, { ReactNode } from 'react';
import css from './modal-overlay.module.css';

interface IModalOverlay {
    children: ReactNode;
    onClose?: any;
  }
  
  const ModalOverlay = ({ children, onClose }: IModalOverlay) => {
    return (
      <div className={css.overlay} id="overlay" onClick={onClose}>
        {children}
      </div>
    );
  };
  
  export default ModalOverlay;