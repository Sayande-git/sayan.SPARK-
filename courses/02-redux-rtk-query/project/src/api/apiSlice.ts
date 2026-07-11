import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User', 'Post'],
  endpoints: builder => ({
    getUsers: builder.query({
      async queryFn() {
        const data = await mockApi.getUsers()
        return { data }
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getPosts: builder.query({
      async queryFn() {
        const data = await mockApi.getPosts()
        return { data }
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    addPost: builder.mutation({
      async queryFn(post) {
        const data = await mockApi.addPost(post)
        return { data }
      },

      invalidatesTags: [{ type: 'Post', id: 'LIST' }],

      async onQueryStarted(post, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, draft => {
            draft.push({
              ...post,
              id: Date.now(),
            })
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {useGetUsersQuery,useGetPostsQuery,useAddPostMutation,} = apiSlice
