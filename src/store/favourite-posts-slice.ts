import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/post';

const initialState: Post[] = [];

const favouritePostsSlice = createSlice({
  name: 'favouritePosts',
  initialState: {
    favouritePosts: initialState,
  },
  reducers: {
    addFavouritePost(state, action: PayloadAction<Post>) {
      const exists = state.favouritePosts.some((post) => post.id === action.payload.id);
      if (!exists) {
        state.favouritePosts.push(action.payload);
      }
    },
    removeFavouritePost(state, action: PayloadAction<number>) {
      state.favouritePosts = state.favouritePosts.filter((post) => post.id !== action.payload);
    },
  },
});

export default favouritePostsSlice.reducer;
export const { addFavouritePost, removeFavouritePost } = favouritePostsSlice.actions;
