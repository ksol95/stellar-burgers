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
export const { addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
