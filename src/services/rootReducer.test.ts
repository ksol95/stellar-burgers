import { expect, describe } from '@jest/globals';
import store, { rootReducer } from './store';

describe('Тест, проверяющий правильную настройку и работу [rootReducer]', () => {
  it('Вызов [rootReducer] с [undefined] состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(newState);
  });
});
