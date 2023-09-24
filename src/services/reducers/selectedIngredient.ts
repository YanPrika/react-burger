import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";

interface SelectedIngredientState {
  selectedIngredient: Ingredient | null;
}

const initialState: SelectedIngredientState = {
  selectedIngredient: null
};

export const selectedIngredientSlice = createSlice({
  name: "selectedIngredient",
  initialState: initialState,
  reducers: {
    addIngredientDetails: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    removeIngredientDetails: (state) => {
      state.selectedIngredient = null;
    },
  },
});
