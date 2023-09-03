import React, {ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom';
import css from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalHeader from "../modal-header/modal-header";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, ingredient } from '../../utils';
import IngredientDetails from '../ingredient-details/ingredient-details';

const modalRoot = document.getElementById("react-modals")!;

interface IModal {
    onClose: any;
    children: ReactNode;
    title?: string;
  }

  const Modal = ({ onClose,  title, children }: IModal) => {
    const reactModals = document.getElementById('react-modals') as HTMLElement;
  
    const handleEscape = (event: KeyboardEvent) => {
      if (event.type === 'keydown' && event.code === 'Escape') {
        onClose();
      }
    };
  
    useEffect(() => {
      document.addEventListener('keydown', handleEscape);
  
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    });
  
    return ReactDOM.createPortal(
      <ModalOverlay onClose={onClose}>
        <div className={css.modalContainer} onClick={e => e.stopPropagation()} >
          <div className={css.closeModalButton} onClick={() => onClose()} ></div>
          {children}          
        </div>
      </ModalOverlay>,
      reactModals
    );  
  };
  
  export default Modal;