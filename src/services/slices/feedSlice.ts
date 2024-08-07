import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export interface IOrderState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined,
  isLoading: true
};

export const getFeeds = createAsyncThunk('feed', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;

        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectFeedState: (state) => state,
    selectFeedOrders: (state) => state.orders
  }
});

export const { selectFeedState, selectFeedOrders } = feedSlice.selectors;
