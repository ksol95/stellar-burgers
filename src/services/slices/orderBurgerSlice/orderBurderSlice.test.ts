import { expect, describe } from '@jest/globals';
import { orderPost } from './actions';
import { IOrderSlice, orderBurgerSlice } from './slice';

describe('orderBurgerSlice - тесты экшена генерируемых при выполнении асинхронного запроса [orderPost]', () => {
  const initialState: IOrderSlice = {
    order: null,
    error: undefined,
    orderRequest: false
  };

  const mok = {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ],
    _id: '66d02d6f119d45001b502cbe',
    owner: {
      name: 'Семён',
      email: 'ksol@ya.ru',
      createdAt: '2024-08-07T08:41:45.068Z',
      updatedAt: '2024-08-09T14:54:09.435Z'
    },
    status: 'done',
    name: 'Space флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-29T08:12:31.176Z',
    updatedAt: '2024-08-29T08:12:31.762Z',
    number: 51475,
    price: 3044
  };

  test('[orderPost] - начало запроса', () => {
    const action = {
      type: orderPost.pending.type
    };
    const expectedState = {
      ...initialState,
      orderRequest: true
    };
    const newState = orderBurgerSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('[orderPost] - успешная загрузка', () => {
    const action = {
      type: orderPost.fulfilled.type,
      payload: { order: mok }
    };
    const expectedState = {
      ...initialState,
      order: mok,
      orderRequest: false
    };

    const newState = orderBurgerSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('[orderPost] - ошибка загрузки', () => {
    const action = {
      type: orderPost.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      orderRequest: false,
      error: 'error'
    };
    const newState = orderBurgerSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
