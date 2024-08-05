import { getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

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
        // state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    ingredientsSelector: (sliceState) => sliceState.ingredients,
    isLoadingSelectors: (sliceState) => sliceState.isLoading
  }
});

// export const {  } = ingredientsSlice.actions;
export const reducer = ingredientsSlice.reducer;
export const { ingredientsSelector, isLoadingSelectors } =
  ingredientsSlice.selectors;
