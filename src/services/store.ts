import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  ingredientsSlice,
  burgerConstructorSlice,
  userSlice,
  feedSlice,
  orderSlice,
  orderBurgerSlice
} from '@slices';

export const rootReducer = combineReducers({
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [orderBurgerSlice.name]: orderBurgerSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
