import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";

export interface SelectedIngredientState {
  selectedIngredient: Ingredient | null;
}

export const initialState: SelectedIngredientState = {
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

export const { addIngredientDetails, removeIngredientDetails } = selectedIngredientSlice.actions;

export default selectedIngredientSlice.reducer;
