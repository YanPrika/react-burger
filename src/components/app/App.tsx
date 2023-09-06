import React, {useState, useEffect} from 'react';
import css from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../burger-constructor/burger-constructor';
import { Ingredient } from '../../utils';
import { getIngredients } from '../../utils/api';
import IngredientDetails from '../ingredient-details/ingredient-details';

export const App = () => {

  let dataId: string;    

    const [arrIngr, setArrIngr] = useState<Ingredient[]>([]);
    useEffect(() => {
        getIngredients()
        .then((res) => {if (res.ok) return res; else console.log(res.statusText)})
        .then(async (res) => await res?.json())
        .then((res) => setArrIngr(res.data))
        .catch((error) => {console.log(error)})
    }, []);    
  
  return (
    <>
      <div className={css.main_rect}>
        <AppHeader />
      </div>
      <main className={css.main_columns}>
        <BurgerIngredients data={arrIngr}/>
        <BurgerConstructor data={arrIngr}/>
      </main>
    </>    
  );
}

export default App;