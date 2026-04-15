import { HomeAction } from './HomeAction';
import { HomeState } from './HomeState';

export function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        banners: action.data.banners,
        trendingProducts: action.data.trendingProducts,
        rankingProducts: action.data.rankingProducts,
        newArrivals: action.data.newArrivals,
        categories: action.data.categories,
      };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.category };
    case 'REFRESH':
      return { ...state, isLoading: true, error: null };
    default:
      return state;
  }
}
