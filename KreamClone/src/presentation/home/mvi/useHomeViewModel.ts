import { useReducer, useCallback, useEffect } from 'react';
import { homeReducer } from './HomeReducer';
import { initialHomeState } from './HomeState';
import { GetHomeUseCase } from '../../../domain/usecase/GetHomeUseCase';

const getHomeUseCase = new GetHomeUseCase();

export function useHomeViewModel() {
  const [state, dispatch] = useReducer(homeReducer, initialHomeState);

  const loadHome = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const data = await getHomeUseCase.execute();
      dispatch({ type: 'LOAD_SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, []);

  const selectCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_CATEGORY', category });
  }, []);

  const refresh = useCallback(async () => {
    dispatch({ type: 'REFRESH' });
    await loadHome();
  }, [loadHome]);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  return { state, selectCategory, refresh };
}
