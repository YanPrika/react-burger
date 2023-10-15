import React from 'react';
import css from '../main-page/main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from '../../components/container/container';

export const Main = () => {
  
  return (
    <div className={css.main_rect}>
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

export default Main;