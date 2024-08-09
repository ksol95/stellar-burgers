import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi } from '@api';

export interface IProfileOrder {
  orders: TOrder[];
  openingOrder: TOrder | null;
  openingOrderNumber: number | null;
  error: string | undefined;
}

const initialState: IProfileOrder = {
  orders: [],
  openingOrder: null,
  openingOrderNumber: null,
  error: undefined
};

export const getOrders = createAsyncThunk('profileOrders/get', getOrdersApi);
export const getOrderByNumber = createAsyncThunk(
  'profileOrders/getOrderById',
  async (id: number | string) => {
    let number: number;
    if (typeof id === 'string') number = Number(id);
    else number = id;
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);

export const profileOrderSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = undefined;
        state.openingOrder = null;
        state.openingOrderNumber = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.error = undefined;
        state.openingOrder = payload;
        state.openingOrderNumber = payload.number;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message;
        state.openingOrder = null;
        state.openingOrderNumber = null;
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
    selectOpeningOrder: (state) => state.openingOrder,
    selectOpeningOrderNumber: (state) => state.openingOrderNumber
  }
});

export const {
  selectProfileOrders,
  selectOpeningOrderNumber,
  selectOpeningOrder
} = profileOrderSlice.selectors;
