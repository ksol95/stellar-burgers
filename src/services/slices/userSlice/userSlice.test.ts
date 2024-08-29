import { expect, describe } from '@jest/globals';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './actions';
import { userSlice } from './slice';

const initialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: undefined,
  error: ''
};

const mokUser = {
  email: 'test@ya.ru',
  name: 'Тестовый пользоатель'
};

describe('[userSlice] - тесты экшена генерируемых при выполнении асинхронного запроса [getUser]', () => {
  test('[getUser] - начало запроса', () => {
    const action = {
      type: getUser.pending.type
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('[getUser] - успешная загрузка', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: mokUser }
    };
    const expectedState = {
      ...initialState,
      user: mokUser,
      isAuthenticated: true
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('[getUser] - ошибка загрузки', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      error: 'error'
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});

describe('[userSlice] - тесты экшена генерируемых при выполнении асинхронного запроса [loginUser]', () => {
  test('[loginUser] - начало запроса', () => {
    const action = {
      type: loginUser.pending.type
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('[loginUser] - успешная загрузка', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mokUser
    };
    const expectedState = {
      ...initialState,
      user: mokUser,
      isAuthenticated: true
    };

    const newState = userSlice.reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('[loginUser] - ошибка загрузки', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      error: 'error'
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});

describe('[userSlice] - тесты экшена генерируемых при выполнении асинхронного запроса [logoutUser]', () => {
  test('[logoutUser] - успешная загрузка', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const expectedState = {
      ...initialState,
      isAuthChecked: true
    };
    const newState = userSlice.reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('[logoutUser] - ошибка загрузки', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      error: 'error'
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});

describe('[userSlice] - тесты экшена генерируемых при выполнении асинхронного запроса [registerUser]', () => {
  test('[registerUser] - ошибка загрузки', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      error: 'error'
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
describe('[userSlice] - тесты экшена генерируемых при выполнении асинхронного запроса [updateUser]', () => {
  test('[updateUser] - успешная загрузка', () => {
    const action = {
      type: updateUser.fulfilled.type,
			payload: mokUser
    };
    const expectedState = {
      ...initialState,
			user: mokUser
    };
    const newState = userSlice.reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  test('[updateUser] - ошибка загрузки', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'error' }
    };
    const expectedState = {
      ...initialState,
      error: 'error'
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
