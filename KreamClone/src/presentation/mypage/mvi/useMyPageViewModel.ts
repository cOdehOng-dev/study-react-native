import { useReducer, useCallback, useEffect } from 'react';
import { myPageReducer } from './MyPageReducer';
import { initialMyPageState } from './MyPageState';
import { GetMyPageUseCase } from '../../../domain/usecase/GetMyPageUseCase';
import { ProductModel } from '../../../domain/model/ProductModel';

const getMyPageUseCase = new GetMyPageUseCase();

export function useMyPageViewModel() {
  const [state, dispatch] = useReducer(myPageReducer, initialMyPageState);

  const load = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const data = await getMyPageUseCase.execute(true);
      dispatch({ type: 'LOAD_SUCCESS', user: data.user, orders: data.orders });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', error: e instanceof Error ? e.message : '오류가 발생했습니다.' });
    }
  }, []);

  const toggleWish = useCallback((product: ProductModel) => {
    dispatch({ type: 'TOGGLE_WISH', product });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { state, toggleWish };
}
