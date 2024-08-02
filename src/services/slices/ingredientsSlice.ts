import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('ingridients/getAll', async () =>
  getIngredientsApi()
);

interface IConstructorSlice {
  isIngredientsLoading: boolean;
  allIngredients: TIngredient[];
  error: 'string' | undefined;
}

const initialState: IConstructorSlice = {
  isIngredientsLoading: false,
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
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        console.log('Успех ингредиенты');
        // state.allIngridients = action.payload;
      });
  },
  selectors: {
    allIngredients: (sliceState) => sliceState.allIngredients
  }
});

export const reducer = ingredientsSlice.reducer;
export const { allIngredients } = ingredientsSlice.selectors;
