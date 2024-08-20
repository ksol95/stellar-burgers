import { useState } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { createAsyncThunk as crAsyncThunk } from '@reduxjs/toolkit';
// import { burgerApi } from '@api';
import { AppDispatch, RootState } from '@store';

export function useForm<T>(inputValues: T) {
  const [formValue, setFormValue] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return { formValue, handleChange, setFormValue };
}

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// export const createAsyncThunk = crAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   extra: typeof burgerApi;
// }>();
