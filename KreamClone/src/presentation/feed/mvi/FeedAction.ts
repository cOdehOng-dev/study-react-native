import { StyleModel } from '../../../../domain/model/StyleModel';

export type FeedAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'LOAD_SUCCESS'; styles: StyleModel[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'TOGGLE_LIKE'; styleId: string }
  | { type: 'REFRESH' };
