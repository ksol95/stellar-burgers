import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

export const getIngredients = createAsyncThunk('ingridients/getAll', async () =>
  getIngredientsApi()
);

interface IIngredientsSlice {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | undefined;
}

const initialState: IIngredientsSlice = {
  isLoading: true,
  ingredients: [],
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isLoadingSelectors: (state) => state.isLoading,
    selectIngredientById: (state, id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id)
  }
});

export const { ingredientsSelector, isLoadingSelectors, selectIngredientById } =
  ingredientsSlice.selectors;
