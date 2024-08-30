import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  'ingridients/getAll',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);
