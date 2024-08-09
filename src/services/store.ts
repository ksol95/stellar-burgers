import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsSlice,
  constructorSlice,
  userSlice,
  feedSlice,
  profileOrderSlice,
  orderBurgerSlice
} from '@slices';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [profileOrderSlice.name]: profileOrderSlice.reducer,
  [orderBurgerSlice.name]: orderBurgerSlice.reducer,
  [feedSlice.name]: feedSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
