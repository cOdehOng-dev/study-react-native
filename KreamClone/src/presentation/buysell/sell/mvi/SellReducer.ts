import { SellAction } from './SellAction';
import { SellState } from './SellState';

export function sellReducer(state: SellState, action: SellAction): SellState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_SIZES':
      return { ...state, sizes: action.sizes, isLoading: false };
    case 'SELECT_SIZE':
      return { ...state, selectedSize: action.size, askPrice: action.size.sellPrice };
    case 'SET_ASK_PRICE':
      return { ...state, askPrice: action.price };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'PLACE_ASK_SUCCESS':
      return { ...state, isSuccess: true, isLoading: false };
    case 'RESET':
      return { ...state, isSuccess: false, error: null };
    default:
      return state;
  }
}
