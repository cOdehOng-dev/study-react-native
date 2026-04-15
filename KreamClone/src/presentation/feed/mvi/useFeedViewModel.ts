import { useReducer, useCallback, useEffect } from 'react';
import { feedReducer } from './FeedReducer';
import { initialFeedState } from './FeedState';
import { GetFeedUseCase } from '../../../../domain/usecase/GetFeedUseCase';

const getFeedUseCase = new GetFeedUseCase();

export function useFeedViewModel() {
  const [state, dispatch] = useReducer(feedReducer, initialFeedState);

  const load = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const styles = await getFeedUseCase.execute(true);
      dispatch({ type: 'LOAD_SUCCESS', styles });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', error: e instanceof Error ? e.message : '오류가 발생했습니다.' });
    }
  }, []);

  const refresh = useCallback(async () => {
    dispatch({ type: 'REFRESH' });
    try {
      const styles = await getFeedUseCase.execute(true);
      dispatch({ type: 'LOAD_SUCCESS', styles });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', error: e instanceof Error ? e.message : '오류가 발생했습니다.' });
    }
  }, []);

  const toggleLike = useCallback((styleId: string) => {
    dispatch({ type: 'TOGGLE_LIKE', styleId });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { state, refresh, toggleLike };
}
