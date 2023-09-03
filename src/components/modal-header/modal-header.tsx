import React, { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './modal-header.module.css';

const ModalHeader: FC<{
  header: string;
  onClose: any;
}> = ({ header, onClose }) => {
  return (
    <div className={css.header}>
      <h3 className={`text text_type_main-large ${css.title}`}>{header}</h3>
      <button onClick={onClose} className={css.button}>
        <CloseIcon type='primary' />
      </button>
    </div>
  );
};

export default ModalHeader;