import { FormEvent } from "react";
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
    //__v: number;
    componentId?: number;
    count: number;
    key?: string
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

export type TResWithoutData = {
  success: boolean;
  message: string;
};

export type TUser = {
  //user: { email: string; name: string };
  email: string | null;
  name: string | null;
};

export type TUserData = {
  user: TUser;
};

export type TToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type IngredientsCount = { [name: string]: number };

export type TFormValues = { [name: string]: string };

export type TUserWithToken = TUserData & TToken;

export type THandleSubmit = (evt: FormEvent<HTMLFormElement>) => void;

export type TIngredientWithCount = Ingredient & {count: number}

export type TOrder = {
  name: string;
  order: { number: number };
};

export type TOrderInfo = {
  _id: string;
  ingredients: string[];
  status: 'done' | 'created' | 'pending'
  name: string;
  createdAt: Date;
  updatedAt: string;
  number: number
};

export type TOrderFeed = {
  success: boolean;
  orders: TOrderInfo[];
  total: number;
  totalToday: number
}

export type TOrderHistory = TOrderFeed

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE', 
  ERROR = 'ERROR'
}