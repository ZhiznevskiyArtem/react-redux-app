import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type PostResponse = {
  userId: number,
  id: number,
  title: string,
  body: string
}
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostResponse[], void>({
      query: () => `posts`,
    }),
    getPost: builder.query<PostResponse, string>({
      query: (postId) => `posts/${postId}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = postsApi;