// src/presentation/mvi/home/HomeAction.ts
import { HomeContent } from '../../../domain/model/HomeContent';

export type HomeAction =
  | { type: 'LOAD_HOME_CONTENT' }
  | { type: 'LOAD_HOME_CONTENT_SUCCESS'; payload: HomeContent }
  | { type: 'LOAD_HOME_CONTENT_FAILURE'; payload: string };
