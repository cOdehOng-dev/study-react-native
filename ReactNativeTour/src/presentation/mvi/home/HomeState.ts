// src/presentation/mvi/home/HomeState.ts
import { HomeContent } from '../../../domain/model/HomeContent';

export interface HomeState {
  isLoading: boolean;
  content: HomeContent | null;
  error: string | null;
}

export const initialHomeState: HomeState = {
  isLoading: false,
  content: null,
  error: null,
};
