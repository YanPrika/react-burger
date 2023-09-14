import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../../services/actions/orders";

type orderState = {
    orderNumber: number|null,
    orderRequest: boolean,
    orderFailed: boolean,
}
const initialState: orderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false
}
export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
      clearOrder: (state) => {
        state.orderNumber = null;
        state.orderRequest = false;
        state.orderFailed = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state, action) => {
          state.orderRequest = true;
          state.orderFailed = false;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.orderNumber = action.payload.order.number;
          state.orderRequest = false;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.orderRequest = false;
          state.orderFailed = true;
        });
    },
  });