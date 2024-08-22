import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { getCookie, setCookie } from '@cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authCheck } from './slice';

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const checkUser = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authCheck());
      });
    } else {
      dispatch(authCheck());
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    if (res.success) {
      setCookie('accessToken', res.accessToken, { SameSite: 'Strict' });
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: TRegisterData) => {
    const data = await updateUserApi({ email, name, password });
    if (!data.success) {
      return;
    } else {
      return data.user;
    }
  }
);
