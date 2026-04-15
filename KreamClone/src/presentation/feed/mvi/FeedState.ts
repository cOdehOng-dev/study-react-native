import { StyleModel } from '../../../../domain/model/StyleModel';

export interface FeedState {
  styles: StyleModel[];
  isLoading: boolean;
  error: string | null;
}

export const initialFeedState: FeedState = {
  styles: [],
  isLoading: false,
  error: null,
};
