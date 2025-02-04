import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './posts-api';

import favoutitePostsSlice from './favourite-posts-slice';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    favouritePosts: favoutitePostsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
