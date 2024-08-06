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
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

export interface UserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | undefined;
  loginUserRequest: boolean;
}

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: '',
  loginUserRequest: false
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

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    alert('Login thunk');
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

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

export const logout = createAsyncThunk('user/logout', logoutApi);

export const updateUser = createAsyncThunk(
  'user/updateData',
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
        console.log(state.error);
        state.error = 'Ошибка получения пользовательских данных';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.user = payload.user;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.user = action.payload ?? null;
        state.isAuthenticated = true;
        state.error = '';
        alert('login successful');
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.error = 'Ошибка регистрации';
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        deleteCookie('accessToken');
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.isLoading = false;
      });
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userDataSelector: (state) => state.user,
    userError: (state) => state.error
  }
});

export const { authChecked } = userSlice.actions;
export const { isAuthCheckedSelector, userDataSelector, userError } =
  userSlice.selectors;
