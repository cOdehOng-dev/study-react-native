import { useReducer, useCallback, useEffect, useMemo } from 'react';
import { shopReducer } from './ShopReducer';
import { initialShopState, SortOption } from './ShopState';
import { ALL_PRODUCTS } from '../../../data/mock/productsMock';

export function useShopViewModel() {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);

  const load = useCallback(() => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      dispatch({ type: 'LOAD_SUCCESS', products: ALL_PRODUCTS });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', error: e instanceof Error ? e.message : '오류가 발생했습니다.' });
    }
  }, []);

  const selectCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_CATEGORY', category });
  }, []);

  const setSort = useCallback((sort: SortOption) => {
    dispatch({ type: 'SET_SORT', sort });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // View-level filtering + sorting (stable useMemo)
  const displayProducts = useMemo(() => {
    const filtered = state.selectedCategory === '전체'
      ? state.products
      : state.products.filter((p) => p.category === state.selectedCategory);
    return [...filtered].sort((a, b) => {
      if (state.sort === 'price_asc') return a.buyPrice - b.buyPrice;
      if (state.sort === 'price_desc') return b.buyPrice - a.buyPrice;
      if (state.sort === 'popular') return b.wishCount - a.wishCount;
      return 0;
    });
  }, [state.products, state.selectedCategory, state.sort]);

  return { state, displayProducts, load, selectCategory, setSort };
}
