import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feed/getFeed', async () => {
  const res = getFeedsApi();
  return res;
});
