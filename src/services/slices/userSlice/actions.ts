import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '@cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authCheck } from './slice';

const clearToken = () => {
  localStorage.clear();
  deleteCookie('accessToken');
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  logoutApi().finally(() => {
    clearToken();
  });
});

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

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password }).catch(() => clearToken())
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
