import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";
import uuid from 'react-uuid';

export interface ComponentsState {
  componentId: number;
  bunComponent: Ingredient | null;
  otherComponents: Ingredient[];
}

export const initialState: ComponentsState = {
  componentId: 0,
  bunComponent: null,
  otherComponents: [],
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: initialState,
  reducers: {
    getComponent: (state, action) => {
      const component = JSON.parse(JSON.stringify(action.payload));
      if (component.type === "bun") {
        if (!state.bunComponent || (state.bunComponent && component._id !== state.bunComponent._id)
        ) {
          state.bunComponent = { ...component, key: uuid() };
        } else { return; }
      } else {
        component.componentId = state.componentId;
        state.otherComponents = [...state.otherComponents, { ...component, key: uuid() }];
        state.componentId += 1;
      }
    },
    deleteComponent: (state, action) => {
      state.otherComponents = state.otherComponents.filter((item) => {
        return item.componentId !== action.payload.componentId;
      });
    },
    moveComponent: (state, action) => {
      if (action.payload.componentDrop.componentId === action.payload.componentDrag.componentId) {
        return;
      } else {
        const indexDragItem = state.otherComponents.findIndex((item) => item.componentId === action.payload.componentDrag.componentId);
        state.otherComponents = state.otherComponents.filter((item) => { return item.componentId !== action.payload.componentDrop.componentId; });
        state.otherComponents.splice(indexDragItem, 0, action.payload.componentDrop);
      }
    },
    clearConstructor: (state) => {
      state.componentId = 0;
      state.bunComponent = null;
      state.otherComponents = [];
    },
  },
});

export const { getComponent, deleteComponent, moveComponent, clearConstructor } = componentsSlice.actions;

export default componentsSlice.reducer;