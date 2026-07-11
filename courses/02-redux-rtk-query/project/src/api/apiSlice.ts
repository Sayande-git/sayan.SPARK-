import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'
import type { User, Post } from './mockServer'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User', 'Post'],
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      async queryFn() {
        try {
          const data = await mockApi.getUsers()
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Something went wrong',
            },
          }
        }
      },
      providesTags: result =>
        result
          ? [
              ...result.map(user => ({ type: 'User' as const, id: user.id })),
              { type: 'User' as const, id: 'LIST' },
            ]
          : [{ type: 'User' as const, id: 'LIST' }],
    }),

    getPosts: builder.query<Post[], void>({
      async queryFn() {
        try {
          const data = await mockApi.getPosts()
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Something went wrong',
            },
          }
        }
      },
      providesTags: result =>
        result
          ? [
              ...result.map(post => ({ type: 'Post' as const, id: post.id })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),

    getPostById: builder.query<Post, number>({
      async queryFn(id) {
        try {
          const data = await mockApi.getPostById(id)
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Something went wrong',
            },
          }
        }
      },
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      async queryFn(post) {
        try {
          const data = await mockApi.createPost(post)
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Something went wrong',
            },
          }
        }
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

export const {useGetUsersQuery,useGetPostsQuery,useGetPostByIdQuery,useAddPostMutation,} = apiSlice