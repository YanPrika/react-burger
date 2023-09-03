import { type } from "os";
import { Interface } from "readline";

export type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
  };

export interface ingredient extends Array<ingredient> {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type Test = {
  idItem: number;
  extraClass?: string;
  handleClose?: (() => void);
};

export type TParams = {
  number: string;
  id: string;
};