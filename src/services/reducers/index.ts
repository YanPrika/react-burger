import { combineReducers } from "redux";
import { ingredientsSlice } from "./ingredients";
import { componentsSlice } from "./components";
import { selectedIngredientSlice } from "./selectedIngredient";
import { orderSlice } from "./order";

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    components: componentsSlice.reducer,
    selectedIngredient: selectedIngredientSlice.reducer,
    order: orderSlice.reducer
});
