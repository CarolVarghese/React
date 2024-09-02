import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}


export interface InitialState {
  loading: boolean;
  users: User[];
  error: string | null;
}


const initialState: InitialState = {
  loading: false,
  users: [],
  error: '',
};


export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch users';
      return rejectWithValue(message);
    }
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload ?? 'Failed to fetch users';
      });
  },
});


export default userSlice.reducer;
export type UserState = InitialState; 

