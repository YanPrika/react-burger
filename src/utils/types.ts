import { type } from "os";
import { Interface } from "readline";
import { store } from "../services/store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Ingredient = {
    _id: string;
    name: string;
    type: "bun"|"main"|"sauce";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    componentId?: number;
  };

export type IngrType = 'top'|'bottom'|undefined;

export type Test = {
  idItem: number;
  extraClass?: string;
  handleClose?: (() => void);
};

export type TParams = {
  number: string;
  id: string;
};

export type CreateOrder = {
  name: string;
  order: { number: number };
};

export type IngredientsCount = { [name: string]: number };