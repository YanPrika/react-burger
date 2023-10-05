import React, { useEffect } from 'react';
import css from '../main-page/main.module.css';
import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch } from '../../components/hooks/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from '../../components/container/container';

export const Main = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  return (
    <div className={css.main_rect}>
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

export default Main;