import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from '../../api/mockServer'

export const fetchUsers = createAsyncThunk( 'users/fetchUsers',
 async () => {
       return await mockApi.getUsers() }
);

interface UsersState {
  list: any[]
    loading: boolean
  error: string | null
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending,  state => {
        state.loading =  true
        state.error =null
      })
      .addCase(fetchUsers.fulfilled, (state,  action) => {
           state.loading = false
     state.list = action.payload
      })
      .addCase(fetchUsers.rejected,(state, action) => {
     state.loading =   false
        state.error = action.error.message || 'Something went wrong'})
  }
});

export default usersSlice.reducer