import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { act } from 'react-dom/test-utils';

export const getIngredients = createAsyncThunk('ingridients/getAll', async () =>
  getIngredientsApi()
);

interface IIngredientsSlice {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: 'string' | undefined;
}

const initialState: IIngredientsSlice = {
  isLoading: true,
  ingredients: [],
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = true;
        console.log(action.error.message);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        console.log(state.ingredients);
      });
  },
  selectors: {
    ingredientsSelector: (sliceState) => sliceState.ingredients,
    isLoadingSelectors: (sliceState) => sliceState.isLoading
  }
});

export const reducer = ingredientsSlice.reducer;
export const { ingredientsSelector, isLoadingSelectors } =
  ingredientsSlice.selectors;
