import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '@cookie';

export interface IUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;

  error: string | undefined;
  loginUserRequest: boolean;
  user: TUser | null;
}

const initialState: IUserState = {
  isAuthChecked: false,
  isAuthenticated: false,

  error: '',
  loginUserRequest: false,
  user: null
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return;
    } else {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    }
  }
);
export const logout = createAsyncThunk('user/logout', logoutApi);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, name, password }: TRegisterData) => {
    const data = await updateUserApi({ email, name, password });
    if (!data.success) {
      return;
    } else {
      return data.user;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = false;
        state.error = 'Ошибка получения пользовательских данных';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.user = payload.user;
      })
      // Логин
      .addCase(login.pending, (state) => {
        state.loginUserRequest = true;

        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = undefined;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.user = action.payload ?? null;
      })
      // Регистрация
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = undefined;
        state.user = action.payload.user;
      })
      // Выход
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        deleteCookie('accessToken');

        state.user = null;
        state.isAuthenticated = false;
      })
      //Редактирование пользователя
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
      });
  },
  selectors: {
    isAuthChecked: (state) => state.isAuthChecked,
    userData: (state) => state.user,
    userError: (state) => state.error
  }
});

export const { authChecked } = userSlice.actions;
export const { isAuthChecked, userData, userError } = userSlice.selectors;
