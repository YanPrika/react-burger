import { URL } from './const';
import { CreateOrder, Ingredient } from './types';

const getIngredients = (): Promise<{ data: Ingredient[] }> => request("ingredients");

const checkRes = async (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    const err = await res.json();
    return await Promise.reject(err);
};

const checkSuc = (res: any) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject({ res });
};

const request = (endpoint: string, options?: any) => {
    return fetch(`${URL}/${endpoint}`, options)
        .then(checkRes)
        .then(checkSuc);
};

const createOrder = (data: Ingredient[]): Promise<CreateOrder> =>
  request("orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: data.map((ingredient) => {
        return ingredient?._id;
      }),
    }),
  });

export { getIngredients, createOrder };