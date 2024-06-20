import { useAppDispatch, useAppSelector } from ".";
import { useEffect, useRef } from 'react';
import { loadMoreProducts, startGetProducts } from "../app/slices/products/thunk";

export const useProduct = () => {
  const { products, isLoadingProducts, hasMore } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const takeRef = useRef(10);

  useEffect(() => {
    dispatch(startGetProducts());
  }, []);


  const onLoadMore = () => {
    takeRef.current += 10;
    dispatch(loadMoreProducts({ take: takeRef.current }));
  }
  

  return {
    products,
    isLoadingProducts,
    hasMore,
    onLoadMore
  }
}
