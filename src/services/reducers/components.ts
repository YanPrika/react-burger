import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";

interface ComponentsState {
  componentId: number;
  bunComponent: Ingredient | null;
  otherComponents: Ingredient[];
}

const initialState: ComponentsState = {
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
          state.bunComponent = component;
        } else { return; }
      } else {
        component.componentId = state.componentId;
        state.otherComponents = [...state.otherComponents, component];
        state.componentId += 1;
      }
    },
    deleteComponent: (state, action) => {
      state.otherComponents = state.otherComponents.filter((item) => {
        return item._id !== action.payload._id;
      });
    },
    moveComponent: (state, action) => {
      if (action.payload.componentDrop._id === action.payload.componentDrag._id) {
        return;
      } else {
        const indexDragItem = state.otherComponents.findIndex((item) => item._id === action.payload.componentDrag._id);
        state.otherComponents = state.otherComponents.filter((item) => { return item._id !== action.payload.componentDrop._id; });
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