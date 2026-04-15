import { useReducer, useCallback } from 'react';
import { searchReducer } from './SearchReducer';
import { initialSearchState } from './SearchState';
import { GetSearchResultsUseCase } from '../../../domain/usecase/GetSearchResultsUseCase';

const getSearchResultsUseCase = new GetSearchResultsUseCase();

export function useSearchViewModel() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  const search = useCallback(async (query: string) => {
    dispatch({ type: 'SET_QUERY', query });
    if (!query.trim()) {
      dispatch({ type: 'LOAD_SUCCESS', results: [] });
      return;
    }
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const results = await getSearchResultsUseCase.execute(query, true);
      dispatch({ type: 'LOAD_SUCCESS', results });
      dispatch({ type: 'ADD_RECENT', query });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', error: e instanceof Error ? e.message : '오류가 발생했습니다.' });
    }
  }, []);

  const clearRecent = useCallback(() => {
    dispatch({ type: 'CLEAR_RECENT' });
  }, []);

  const setFilter = useCallback((category: string | null) => {
    dispatch({ type: 'SET_FILTER', category });
  }, []);

  return { state, search, clearRecent, setFilter };
}
