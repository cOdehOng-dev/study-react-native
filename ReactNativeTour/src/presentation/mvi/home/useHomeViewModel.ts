// src/presentation/mvi/home/useHomeViewModel.ts
import { useReducer, useEffect, useCallback } from 'react';
import { GetHomeContentUseCase } from '../../../domain/usecase/GetHomeContentUseCase';
import { TourRepositoryImpl } from '../../../data/repository/TourRepositoryImpl';
import { homeReducer } from './HomeReducer';
import { initialHomeState } from './HomeState';

const repository = new TourRepositoryImpl();
const getHomeContentUseCase = new GetHomeContentUseCase(repository);

export function useHomeViewModel() {
  const [state, dispatch] = useReducer(homeReducer, initialHomeState);

  const loadContent = useCallback(async () => {
    dispatch({ type: 'LOAD_HOME_CONTENT' });
    try {
      const content = await getHomeContentUseCase.execute();
      dispatch({ type: 'LOAD_HOME_CONTENT_SUCCESS', payload: content });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      dispatch({ type: 'LOAD_HOME_CONTENT_FAILURE', payload: msg });
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return { state, reload: loadContent };
}
