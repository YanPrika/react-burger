import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAuthProvide } from "../../utils/authorization";
import { getUserRequest, editUserRequest } from "../../utils/apiAuth";
import { TFormValues } from "../../utils/types";

export const getUser = createAsyncThunk("user/authorization", async () => {
  return await getUserRequest();
});

export const editUser= createAsyncThunk("user/editUserInfo", async (form: TFormValues) => {
  return await editUserRequest(form);
});

export const onLogin = createAsyncThunk("user/onLogin", async (form: TFormValues) => {
  const { onLogin } = useAuthProvide();
  const response = await onLogin(form);
  return response;
});

export const onLogOut = createAsyncThunk("user/onLogOut", async () => {
  const { onLogOut } = useAuthProvide();
  const response = await onLogOut();
  return response;
});

export const onRegister = createAsyncThunk("user/onRegister", async (form: TFormValues) => {
  const { onRegister } = useAuthProvide();
  const response = await onRegister(form);
  return response;
});