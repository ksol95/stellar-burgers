import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderPost = createAsyncThunk('orderBurger/Post', orderBurgerApi);
