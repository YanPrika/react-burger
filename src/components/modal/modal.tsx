import React, {ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom';
import css from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModal {
  onClose: ()=>void;
  children: ReactNode;
  title?: string;
}

const Modal = ({ onClose, children }: IModal) => {
  const reactModals = document.getElementById('react-modals') as HTMLElement; 
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.type === 'keydown' && event.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={css.modalContainer} onClick={e => e.stopPropagation()} >
        <div className={css.closeModalButton} onClick={() => onClose()} >        
          <CloseIcon type="primary" />
        </div>
        {children}          
      </div>
    </ModalOverlay>,
    reactModals
  );  
};

export default Modal;