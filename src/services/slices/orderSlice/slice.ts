import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, getOrders } from './actions';

export interface IProfileOrder {
  orders: TOrder[];
  currentOrder: TOrder | null;
  error: string | undefined;
}

const initialState: IProfileOrder = {
  orders: [],
  currentOrder: null,
  error: undefined
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = undefined;
        state.currentOrder = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.error = undefined;
        state.currentOrder = payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message;
        state.currentOrder = null;
      })

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
    selectProfileOrders: (state) => state.orders,
    selectOpeningOrder: (state) => state.currentOrder
  }
});

export const { selectProfileOrders, selectOpeningOrder } = orderSlice.selectors;
