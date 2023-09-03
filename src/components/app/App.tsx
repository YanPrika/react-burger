import React from 'react';
import css from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../burger-constructor/burger-constructor';

export const App = () => {
  
  return (
    <>
      <div className={css.main_rect}>
        <AppHeader />
      </div>
      <main className={css.main_columns}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>    
  );
}

export default App;