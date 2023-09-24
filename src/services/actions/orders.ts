import { createOrder as createOrderApi } from "../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  createOrderApi
);