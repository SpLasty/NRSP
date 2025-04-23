import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  login as loginApi,
  register as registerApi,
  getProfile,
  UserProfile,
} from '../../services/authService';

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialised: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  initialised: false,
};



export const loginUser = createAsyncThunk<
  UserProfile,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user } = await loginApi(email, password);
    return user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const registerUser = createAsyncThunk<
  UserProfile,
  { name: string; email: string; password: string; role: UserProfile['role']; location?: string },
  { rejectValue: string }
>('auth/registerUser', async (data, { rejectWithValue }) => {
  try {
    await registerApi(data);
    await loginApi(data.email, data.password);
    const user = await getProfile();
    return user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
    },
    /** sets `user` + `token` when we restore from localStorage */
    setCredentials(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.token = localStorage.getItem('token');
    },
    /** marks that the bootstrap step is finished */
    setAuthInitialised(state) {
      state.initialised = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = localStorage.getItem('token');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = localStorage.getItem('token');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout, setCredentials, setAuthInitialised } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
