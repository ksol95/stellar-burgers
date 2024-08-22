import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
