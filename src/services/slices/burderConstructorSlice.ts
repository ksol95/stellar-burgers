import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

export const initialState: TConstructorState = {
  ingredients: [],
  bun: null
};

type TmoveElement = {
  indexFrom: number;
  indexTo: 1 | -1;
};
const moveArrayElements = (
  arr: TConstructorIngredient[],
  indexFrom: number,
  indexTo: number
) => {
  if (indexFrom >= 0 && indexTo >= 0 && indexTo <= arr.length - 1)
    return ([arr[indexFrom], arr[indexTo]] = [arr[indexTo], arr[indexFrom]]);
};

export const constructorSlice = createSlice({
  name: 'burderConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.bun = action.payload;
        else state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    moveItem: (state, action: PayloadAction<TmoveElement>) => {
      const { indexFrom, indexTo } = action.payload;
      console.log(action);
      moveArrayElements(state.ingredients, indexFrom, indexFrom + indexTo);
    }
  },
  selectors: {
    selectConstructor: (state) => state,
    ingredientsInConstructor: (state) => state.ingredients,
    bunInConstructor: (state) => state.bun
  }
});

export const { ingredientsInConstructor, bunInConstructor, selectConstructor } =
  constructorSlice.selectors;
export const { addIngredient, removeIngredient, clearConstructor, moveItem } =
  constructorSlice.actions;
