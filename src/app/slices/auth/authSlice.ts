import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces';

interface AuthState {
  user: IUser | null;
  isLoginError: boolean;
  loginErrorMessage: string | null;
  isLoadingLogin: boolean;
  status: 'checking' | 'authenticated' | 'unauthenticated';
}

const initialState: AuthState = {
  user: null,
  status: 'checking',
  isLoginError: false,
  loginErrorMessage: null,
  isLoadingLogin: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLoginLoading: (state) => {
      state.isLoadingLogin = !state.isLoadingLogin;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.status = 'authenticated';
      state.isLoginError = false;
      state.loginErrorMessage = null;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.loginErrorMessage = action.payload;
      state.isLoginError = true;
      state.user = null;
      state.status = 'unauthenticated';
    },
    setError: (state, action: PayloadAction<{ isError: boolean; }>) => {
      state.isLoginError = action.payload.isError;
    }
  },
})

export const { loginSuccess, loginError, toggleLoginLoading, setError } = authSlice.actions

export default authSlice.reducer;