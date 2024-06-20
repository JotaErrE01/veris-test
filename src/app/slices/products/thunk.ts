import { AppDispatch } from "../../store";
import { onLoadProductsSuccess, setLoadingProducts } from "./productsSlice";


export const startGetProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoadingProducts(true));

    const response = await fetch(`https://dummyjson.com/products?limit=${10}&skip=${0}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();   

    if (!response.ok) throw new Error(data.message)

    dispatch(onLoadProductsSuccess(data));
  } catch (error) {

  }
  dispatch(setLoadingProducts(false));
}


export const loadMoreProducts = ({ take = 20, skip = 0 }: { take?: number; skip?: number } = {})  => async (dispatch: AppDispatch) => {
  dispatch(setLoadingProducts(true));
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${take}&skip=${skip}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message)

    dispatch(onLoadProductsSuccess(data));
  } catch (error) {
    
  }
  dispatch(setLoadingProducts(false));
}
