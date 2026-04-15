import { ShopState } from './ShopState';
import { ShopAction } from './ShopAction';

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.category };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, error: null, products: action.products };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'SET_SORT':
      return { ...state, sort: action.sort };
    default:
      return state;
  }
}
