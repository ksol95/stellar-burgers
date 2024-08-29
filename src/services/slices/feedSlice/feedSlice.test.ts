import { expect, describe } from '@jest/globals';
import { getFeeds } from './actions';
import { feedSlice } from './slice';

describe('Лента заказов - тесты экшена генерируемых при выполнении асинхронного запроса [getFeeds]', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: undefined,
    isLoading: true
  };
  const mockFeedsOrders = {
    success: true,
    orders: [
      {
        _id: '66c73586119d45001b501616',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский spicy люминесцентный бургер',
        createdAt: '2024-08-22T12:56:38.762Z',
        updatedAt: '2024-08-22T12:56:39.329Z',
        number: 50548
      }
    ],
    total: 50214,
    totalToday: 172
  };

  test('[getFeeds] - начала запроса', () => {
    const action = {
      type: getFeeds.pending.type
    };

    const newState = feedSlice.reducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  test('[getFeeds] - успешное выполнение запроса', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeedsOrders
    };
    const expectedState = {
      ...initialState,
      orders: mockFeedsOrders.orders,
      total: mockFeedsOrders.total,
      totalToday: mockFeedsOrders.totalToday,
      isLoading: false
    };

    const newState = feedSlice.reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  test('[getFeeds] - ошибка запроса', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: 'error'
    };

    const newState = feedSlice.reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
