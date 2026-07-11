import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


import { mockApi } from './mockServer'


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
      endpoints: builder => ({
    getUsers: builder.query({

      async queryFn() {
        try {
          const data = await mockApi.getUsers()
             return { data }
        } catch (error) {
          return {
      error: {
              status: 'CUSTOM_ERROR',
                error: error instanceof Error ? error.message : 'Something went wrong' }
          }
    }
      }
                  })
  })
});

export const { useGetUsersQuery } = apiSlice