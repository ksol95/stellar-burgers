import { expect, describe } from '@jest/globals';

import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredientById,
  clearConstructor,
  moveItem,
  initialState
} from './slice';

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Тест синхронных экшенов слайса [burgerConstructor]', () => {
  const testIngredients = {
    sauce: {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      __v: 0,
      id: expect.any(String)
    },
    main: {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0,
      id: expect.any(String)
    },
    bun: {
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
      __v: 0,
      id: expect.any(String)
    }
  };
  describe('Тест экшена - [addIngredient]', () => {
    it('Добавление булки [bun]', () => {
      const expectedResult = testIngredients.bun;

      const newState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(testIngredients.bun)
      );

      const { bun } = newState;
      expect(bun).toEqual(expectedResult);
    });

    it('Добавление ингредиента и соуса [main][sauce] ', () => {
      const expectedResult = [testIngredients.main, testIngredients.sauce];

      let newState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(testIngredients.main)
      );

      newState = burgerConstructorSlice.reducer(
        newState,
        addIngredient(testIngredients.sauce)
      );

      const { ingredients } = newState;
      expect(ingredients).toEqual(expectedResult);
    });
  });

  it('Тест экшена - [removeIngredientById] (по ID - mainId)', () => {
    // ID удаляемого ингредиента
    const targetId = 'mainId';
    // Ожидаемый стейт
    const expectedState = {
      bun: { ...testIngredients.bun, id: 'bunId' },
      ingredients: [{ ...testIngredients.sauce, id: 'sauceId' }]
    };
    // Начальный стейт с двумя ингредиентами
    const startState = {
      bun: { ...testIngredients.bun, id: 'bunId' },
      ingredients: [
        { ...testIngredients.sauce, id: 'sauceId' },
        { ...testIngredients.main, id: 'mainId' }
      ]
    };

    // Удаляем ингредиент main по ID с помощью [removeIngredientById]
    const newState = burgerConstructorSlice.reducer(
      startState,
      removeIngredientById(targetId)
    );

    expect(newState).toEqual(expectedState);
  });

  it('Тест экшена - [clearConstructor]', () => {
    // Создаём стейт с добавленными ингредентами
    const startState = {
      bun: { ...testIngredients.bun, id: 'bunId' },
      ingredients: [
        { ...testIngredients.main, id: 'mainId' },
        { ...testIngredients.sauce, id: 'sauceId' }
      ]
    };
    // очищаем конструктор
    const newState = burgerConstructorSlice.reducer(
      startState,
      clearConstructor()
    );

    expect(newState).toEqual(initialState);
  });

  describe('Тест экшена - [moveItem]', () => {
    it('Вверх', () => {
      const expectedResult = {
        bun: null,
        ingredients: [
          { ...testIngredients.main, id: 'mainId' },
          { ...testIngredients.sauce, id: 'sauceId' }
        ]
      };
      // Создаем стэйт с добавленными ингредентами
      let newState: typeof initialState = {
        ...initialState,
        ingredients: [
          { ...testIngredients.sauce, id: 'sauceId' },
          { ...testIngredients.main, id: 'mainId' }
        ]
      };
      // Перемещаем ингредиент 1 вверх
      newState = burgerConstructorSlice.reducer(
        newState,
        moveItem({ indexFrom: 1, indexTo: -1 })
      );

      expect(newState).toEqual(expectedResult);
    });
    it('Вниз', () => {
      const expectedResult = {
        bun: null,
        ingredients: [
          { ...testIngredients.main, id: 'mainId' },
          { ...testIngredients.sauce, id: 'sauceId' }
        ]
      };
      // Создаем стэйт с добавленными ингредентами
      let newState: typeof initialState = {
        ...initialState,
        ingredients: [
          { ...testIngredients.sauce, id: 'sauceId' },
          { ...testIngredients.main, id: 'mainId' }
        ]
      };
      // Перемещаем ингредиент 1 вверх
      newState = burgerConstructorSlice.reducer(
        newState,
        moveItem({ indexFrom: 0, indexTo: 1 })
      );

      expect(newState).toEqual(expectedResult);
    });
  });
});
