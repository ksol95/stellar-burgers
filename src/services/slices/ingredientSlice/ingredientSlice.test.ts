import { expect, describe } from '@jest/globals';
import { getIngredients } from './actions';
import ingredientsReducer from './slice';

describe('ingredientSlice - тесты экшена генерируемых при выполнении асинхронного запроса [getIngredients]', () => {
  const initialState = { isLoading: true, ingredients: [], error: undefined };
  const mockIngredients = {
    ...initialState,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
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
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ]
  };
  test('[getIngredients] - начало запроса', () => {
    const action = {
      type: getIngredients.pending.type
    };
    const expectedState = {
      ...initialState,
      isLoading: true
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
  test('[getIngredients] - успешная загрузка', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients.ingredients
    };
    const expectedState = {
      ...initialState,
      ingredients: mockIngredients.ingredients,
      isLoading: false
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('[getIngredients] - ошибка загрузки', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = { ...initialState, isLoading: true, error: 'error' };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
