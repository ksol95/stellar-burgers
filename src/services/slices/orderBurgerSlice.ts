import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export interface IOrderSlice {
  order: TOrder | null;
  error: string | undefined;
  orderRequest: boolean;
}

const initialState: IOrderSlice = {
  order: null,
  error: undefined,
  orderRequest: false
};

export const orderPost = createAsyncThunk('orderBurger/Post', orderBurgerApi);

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: { clearOrderDetails: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(orderPost.pending, (state) => {
        state.error = undefined;
        state.orderRequest = true;
      })
      .addCase(orderPost.fulfilled, (state, action) => {
        state.error = undefined;
        state.order = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(orderPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.orderRequest = false;
      });
  },
  selectors: {
    selectOrderDetails: (state) => state.order,
    selectOrderRequest: (state) => state.orderRequest
  }
});

export const { selectOrderRequest, selectOrderDetails } =
  orderBurgerSlice.selectors;

export const { clearOrderDetails } = orderBurgerSlice.actions;
