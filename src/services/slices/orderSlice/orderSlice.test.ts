import { expect, describe } from '@jest/globals';
import { getOrders, getOrderByNumber } from './actions';
import { orderSlice } from './slice';

const initialState = {
  orders: [],
  currentOrder: null,
  error: undefined
};

const mokOrders = [
  {
    _id: '66b3602c119d45001b4fe2b5',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-07T11:53:16.740Z',
    updatedAt: '2024-08-07T11:53:17.221Z',
    number: 48725
  },
  {
    _id: '66b36091119d45001b4fe2b8',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-07T11:54:57.900Z',
    updatedAt: '2024-08-07T11:54:58.380Z',
    number: 48726
  },
  {
    _id: '66b360ca119d45001b4fe2bf',
    ingredients: [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Астероидный space флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-07T11:55:54.463Z',
    updatedAt: '2024-08-07T11:55:55.062Z',
    number: 48727
  }
];

const mokCurrentOrder = {
  _id: '66b3602c119d45001b4fe2b5',
  ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2024-08-07T11:53:16.740Z',
  updatedAt: '2024-08-07T11:53:17.221Z',
  number: 48725
};
describe('[profileOrderSlice] - тесты экшена генерируемых при выполнении асинхронного запроса [getOrders]', () => {
  test('[getOrders] - начало запроса', () => {
    const action = {
      type: getOrders.pending.type
    };
    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('[getOrders] - успешная загрузка', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mokOrders
    };
    const expectedState = {
      ...initialState,
      orders: mokOrders
    };

    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('[getOrders] - ошибка загрузки', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      error: 'error'
    };
    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
describe('[profileOrderSlice] - тесты экшена генерируемых при выполнении асинхронного запроса [getOrderByNumber]', () => {
  test('[getOrderByNumber] - начало запроса', () => {
    const action = {
      type: getOrderByNumber.pending.type
    };
    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('[getOrderByNumber] - успешная загрузка', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mokCurrentOrder
    };
    const expectedState = {
      ...initialState,
      currentOrder: mokCurrentOrder
    };

    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('[getOrderByNumber] - ошибка загрузки', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      error: 'error'
    };
    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
