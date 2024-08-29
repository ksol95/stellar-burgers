import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './actions';

export interface UserState {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  user: TUser | undefined;
  error: string | undefined;
}

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: undefined,
  error: ''
};

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
    selectUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
        state.error = '';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = undefined;
        state.isAuthenticated = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = '';
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = undefined;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        state.error = error.message;
      })

      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.user = undefined;
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
