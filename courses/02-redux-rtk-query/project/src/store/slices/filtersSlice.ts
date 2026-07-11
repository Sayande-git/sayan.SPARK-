import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    sortBy: 'newest',
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
  },
})

export const { setSortBy } = filtersSlice.actions
export default filtersSlice.reducer