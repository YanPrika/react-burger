import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../actions/ingredients";
import { Ingredient } from "../../utils/types";

interface IngredientsState {
  ingredients: Ingredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getIngredients.pending, (state, action) => {
          state.ingredientsRequest = true;
          state.ingredientsFailed = false;
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
          state.ingredients = action.payload.data;
          state.ingredientsRequest = false;
        })
        .addCase(getIngredients.rejected, (state, action) => {
          state.ingredientsRequest = false;
          state.ingredientsFailed = true;
        });
    },
  });