import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

import ingredientSliceReducer from './slice';
import * as actions from './actions';
import { fakeIngredients } from '../data';
import { TIngredient } from '@utils-types';
// import store from '@store';

describe('Тестирование слайса [ingredientSlice]', () => {
  test('Тест загрузки ингредиентов [getIngredients]', async () => {
    const expectedResult: Array<TIngredient> = fakeIngredients.slice(0, 4);
    console.log(expectedResult);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const testStore = configureStore({
      reducer: ingredientSliceReducer
    });

    await testStore.dispatch(actions.getIngredients());
    const ingredients = testStore.getState().ingredients;
    console.log(testStore.getState());
    console.log(ingredients);
    expect(ingredients).toEqual(expectedResult);
  });
});
