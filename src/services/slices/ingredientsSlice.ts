import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { act } from 'react-dom/test-utils';

export const getIngredients = createAsyncThunk('ingridients/getAll', async () =>
  getIngredientsApi()
);

interface IConstructorSlice {
  isIngredientsLoading: boolean;
  allIngredients: TIngredient[];
  error: 'string' | undefined;
}

const initialState: IConstructorSlice = {
  isIngredientsLoading: true,
  allIngredients: [],
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = true;
        console.log(action.error.message);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.allIngredients = action.payload;
        console.log(state.allIngredients);
      });
  },
  selectors: {
    allIngredientsSelector: (sliceState) => sliceState.allIngredients,
    isIngredientsLoadingSelector: (sliceState) =>
      sliceState.isIngredientsLoading
  }
});

export const reducer = ingredientsSlice.reducer;
export const { allIngredientsSelector, isIngredientsLoadingSelector } =
  ingredientsSlice.selectors;
