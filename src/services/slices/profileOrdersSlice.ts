import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export interface IProfileOrder {
  orders: TOrder[];
  error: string | undefined;
}

const initialState: IProfileOrder = {
  orders: [],
  error: undefined
};

export const getOrders = createAsyncThunk('profileOrders/get', getOrdersApi);

export const profileOrderSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.error = undefined;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
  selectors: {
    selectProfileOrders: (state) => state.orders
  }
});

export const { selectProfileOrders } = profileOrderSlice.selectors;
