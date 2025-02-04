import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../types/post';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts`,
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `posts/${postId}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = postsApi;
