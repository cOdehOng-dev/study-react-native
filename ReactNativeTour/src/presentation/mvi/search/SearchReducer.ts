// src/presentation/mvi/search/SearchReducer.ts
import { SearchAction } from './SearchAction';
import { SearchState } from './SearchState';

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SELECT_TAB':
      return { ...state, activeTab: action.payload };

    case 'UPDATE_FLIGHT_DEPARTURE':
      return { ...state, flight: { ...state.flight, departure: action.payload } };

    case 'UPDATE_FLIGHT_ARRIVAL':
      return { ...state, flight: { ...state.flight, arrival: action.payload } };

    case 'UPDATE_FLIGHT_DATE':
      return {
        ...state,
        flight: {
          ...state.flight,
          departureDate: action.payload.departure,
          returnDate: action.payload.return,
        },
      };

    case 'UPDATE_PASSENGERS':
      return {
        ...state,
        flight: { ...state.flight, adults: action.payload.adults, children: action.payload.children },
        hotel: { ...state.hotel, adults: action.payload.adults, children: action.payload.children },
        tour: { ...state.tour, adults: action.payload.adults, children: action.payload.children },
        package: { ...state.package, adults: action.payload.adults, children: action.payload.children },
      };

    case 'SWAP_FLIGHT_CITIES':
      return {
        ...state,
        flight: {
          ...state.flight,
          departure: state.flight.arrival,
          arrival: state.flight.departure,
        },
      };

    case 'UPDATE_HOTEL_DESTINATION':
      return { ...state, hotel: { ...state.hotel, destination: action.payload } };

    case 'UPDATE_HOTEL_DATE':
      return {
        ...state,
        hotel: { ...state.hotel, checkIn: action.payload.checkIn, checkOut: action.payload.checkOut },
      };

    case 'UPDATE_TOUR_DESTINATION':
      return { ...state, tour: { ...state.tour, destination: action.payload } };

    case 'UPDATE_PACKAGE_DESTINATION':
      return { ...state, package: { ...state.package, destination: action.payload } };

    default:
      return state;
  }
}
