import { URL } from './const';

export const getIngredients = () => {  
  return fetch(`${URL}/ingredients`, {});
};