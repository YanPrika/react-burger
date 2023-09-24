import { createAsyncThunk } from "@reduxjs/toolkit"
import {getIngredients as getIngr} from "../../utils/api"

export const getIngredients = createAsyncThunk(
    "getIngredients",
    getIngr
);