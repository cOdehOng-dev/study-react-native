import { HomeData } from '../../../domain/usecase/GetHomeUseCase';

export type HomeAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'LOAD_SUCCESS'; data: HomeData }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'REFRESH' };
