import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '@cookie';

export interface UserState {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  // loginUserRequest: boolean;
  user: TUser | undefined;
  error: string | undefined;
}

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  // loginUserRequest: false,
  user: undefined,
  error: ''
};

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
      setCookie('accessToken', res.accessToken);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    clearErrors: (state) => {
      state.error = '';
    }
  },
  selectors: {
    selectUserAuthenticated: (state) => state.isAuthenticated,
    selectUserData: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserError: (state) => state.error,
    selectRegisterError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // state.loginUserRequest = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        // state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = '';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;

        // state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.clear();
        deleteCookie('accessToken');
        state.user = undefined;
        state.isAuthenticated = false;
      })

      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.user = undefined;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.error = '';
      })

      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  }
});

export const userReducer = userSlice.reducer;
export const {
  selectUserAuthenticated,
  selectUserData,
  selectIsAuthChecked,
  selectUserError
} = userSlice.selectors;
export const { authCheck, clearErrors } = userSlice.actions;
