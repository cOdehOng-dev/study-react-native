import { FeedState } from './FeedState';
import { FeedAction } from './FeedAction';

export function feedReducer(state: FeedState, action: FeedAction): FeedState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, error: null, styles: action.styles };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        styles: state.styles.map((s) =>
          s.id === action.styleId
            ? { ...s, isLiked: !s.isLiked, likeCount: s.isLiked ? s.likeCount - 1 : s.likeCount + 1 }
            : s,
        ),
      };
    case 'REFRESH':
      return { ...state, isLoading: true, error: null };
    default:
      return state;
  }
}
