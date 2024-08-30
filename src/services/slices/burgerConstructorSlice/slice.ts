import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
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

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
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
    removeIngredientById: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearConstructor: () => initialState,
    moveItem: (state, action: PayloadAction<TmoveElement>) => {
      const { indexFrom, indexTo } = action.payload;
      moveArrayElements(state.ingredients, indexFrom, indexFrom + indexTo);
    }
  },
  selectors: {
    selectConstructor: (state) => state,
    burgerComposition: (state) => {
      if (state.bun) {
        const burger: string[] = [];
        // Добавляем булку в начало
        burger.push(state.bun._id);
        // Ингредиенты в середине
        burger.push(...state.ingredients.map((ingredient) => ingredient._id));
        // Добавляем булку в конец
        burger.push(state.bun._id);
        return burger;
      }
      return null;
    }
  }
});

export const { burgerComposition, selectConstructor } =
  burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredientById,
  clearConstructor,
  moveItem
} = burgerConstructorSlice.actions;
