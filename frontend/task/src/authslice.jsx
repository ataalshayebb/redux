import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user login
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
      try {
        const response = await axios.post('http://localhost:4025/api/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
           console.log('Token stored:', localStorage.getItem('token'));
        return response.data;
      } catch (error) {
       
        return(error.response?.data);
      }
    }
    
  );


export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, password, role }) => {
    try {
      const response = await axios.post('http://localhost:4025/api/auth/signup', { username, password, role });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return (error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    role: null,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ? action.payload.error : 'Login failed';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload ? action.payload.error : 'Signup failed';
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;