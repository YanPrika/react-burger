import React, { useState } from "react";
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { AppDispatch, RootState, TFormValues } from '../../utils/types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch: () => AppDispatch = dispatchHook

export function useFormWithValidation() {
  const { user } = useSelector((store: any) => store.user);
  const [values, setValues] = useState<TFormValues>(
    user !== null
      ? { name: user.name, email: user.email, password: "" }
      : {}
  );
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValidForm((target.closest("form") as HTMLFormElement).checkValidity());
  };

  return {
    values,
    setValues,
    handleChange,
    isValidForm,
  };
}