import { BuyAction } from './BuyAction';
import { BuyState } from './BuyState';

export function buyReducer(state: BuyState, action: BuyAction): BuyState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_SIZES':
      return { ...state, sizes: action.sizes, isLoading: false };
    case 'SELECT_SIZE':
      return { ...state, selectedSize: action.size, bidPrice: action.size.buyPrice };
    case 'SET_BID_PRICE':
      return { ...state, bidPrice: action.price };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'PLACE_BID_SUCCESS':
      return { ...state, isSuccess: true, isLoading: false };
    case 'RESET':
      return { ...state, isSuccess: false, error: null };
    default:
      return state;
  }
}
