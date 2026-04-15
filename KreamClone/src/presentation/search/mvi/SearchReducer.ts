import { SearchState } from './SearchState';
import { SearchAction } from './SearchAction';

const MAX_RECENT = 10;

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.query };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, error: null, results: action.results };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'ADD_RECENT': {
      const filtered = state.recentSearches.filter((q) => q !== action.query);
      return { ...state, recentSearches: [action.query, ...filtered].slice(0, MAX_RECENT) };
    }
    case 'CLEAR_RECENT':
      return { ...state, recentSearches: [] };
    case 'SET_FILTER':
      return { ...state, selectedCategory: action.category };
    default:
      return state;
  }
}
