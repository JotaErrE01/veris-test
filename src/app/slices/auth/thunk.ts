import { StorageAdapter } from "../../../config/adapters/asyncStorageAdapter";
import { AppDispatch } from "../../store";
import { loginError, loginSuccess, toggleLoginLoading } from "./authSlice";


export const startLogin = ({ username, password }: { username: string, password: string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(toggleLoginLoading());

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message)

    await StorageAdapter.setItem('token', data.token);
    await StorageAdapter.setItem('refreshToken', data.refreshToken);

    dispatch(loginSuccess(data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al inciar sesión';

    dispatch(loginError(errorMessage));
  }
  dispatch(toggleLoginLoading());
}

export const startChecking = () => async (dispatch: AppDispatch) => {
  try {
    const token = await StorageAdapter.getItem('token');
    const refreshToken = await StorageAdapter.getItem('refreshToken');

    if (!token || !refreshToken) throw new Error('No authenticated');

    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('error al iniciar sesion')

    const data = await response.json();

    const tokenRes = await fetch('https://dummyjson.com/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30, // optional, defaults to 60
      })
    });

    const tokenData = await tokenRes.json();

    await StorageAdapter.setItem('token', tokenData.token);
    await StorageAdapter.setItem('refreshToken', tokenData.refreshToken);
    dispatch(loginSuccess(data));
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : 'Error al inciar sesión';
    dispatch(loginError(errorMessage));
  }
}

