import { SearchAction } from './searchAction';
import { SearchState } from './searchState';

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'QueryChanged': return { ...state, query: action.query };
    case 'SearchAirports': return { ...state, isLoading: true, error: null };
    case 'AirportsLoaded': return { ...state, isLoading: false, airports: action.airports };
    case 'SearchError': return { ...state, isLoading: false, error: action.error };
    default: return state;
  }
}
