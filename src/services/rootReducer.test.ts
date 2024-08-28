import { expect, describe } from '@jest/globals';
import store, { rootReducer } from './store';

describe('Тесты rootReducer', () => {
  test('Проверка правильной настройки и работы rootReduce', () => {
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(newState);
  });
});
