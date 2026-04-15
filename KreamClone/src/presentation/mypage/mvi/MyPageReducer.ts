import { MyPageState } from './MyPageState';
import { MyPageAction } from './MyPageAction';

export function myPageReducer(state: MyPageState, action: MyPageAction): MyPageState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, error: null, user: action.user, orders: action.orders };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'TOGGLE_WISH': {
      const exists = state.wishlist.some((p) => p.id === action.product.id);
      const wishlist = exists
        ? state.wishlist.filter((p) => p.id !== action.product.id)
        : [...state.wishlist, action.product];
      return { ...state, wishlist };
    }
    default:
      return state;
  }
}
