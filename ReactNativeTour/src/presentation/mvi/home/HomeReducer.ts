// src/presentation/mvi/home/HomeReducer.ts
import { HomeAction } from './HomeAction';
import { HomeState } from './HomeState';

export function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case 'LOAD_HOME_CONTENT':
      return { ...state, isLoading: true, error: null };

    case 'LOAD_HOME_CONTENT_SUCCESS':
      return { ...state, isLoading: false, content: action.payload, error: null };

    case 'LOAD_HOME_CONTENT_FAILURE':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
