import { HomeAction } from './homeAction';
import { HomeState } from './homeState';

export function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case 'LoadFlights':
      return { ...state, isLoading: true, error: null };
    case 'FlightsLoaded':
      return { ...state, isLoading: false, flights: action.flights };
    case 'FlightsError':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
