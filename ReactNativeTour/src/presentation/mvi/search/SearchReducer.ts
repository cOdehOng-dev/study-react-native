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
          ...(action.payload.return !== undefined && { returnDate: action.payload.return }),
        },
      };

    case 'UPDATE_PASSENGERS':
      return {
        ...state,
        flight: {
          ...state.flight,
          adults: action.payload.adults,
          children: action.payload.children,
          ...(action.payload.infants !== undefined && { infants: action.payload.infants }),
        },
        hotel: { ...state.hotel, adults: action.payload.adults, children: action.payload.children },
        tour: { ...state.tour, adults: action.payload.adults, children: action.payload.children },
        package: { ...state.package, adults: action.payload.adults, children: action.payload.children },
      };

    case 'UPDATE_TRIP_TYPE':
      return {
        ...state,
        flight: {
          ...state.flight,
          tripType: action.payload,
          returnDate: action.payload === 'oneway' ? undefined : state.flight.returnDate,
        },
      };

    case 'UPDATE_TOUR_DATE':
      return { ...state, tour: { ...state.tour, date: action.payload } };

    case 'UPDATE_PACKAGE_DATE':
      return {
        ...state,
        package: { ...state.package, departureDate: action.payload.departure, returnDate: action.payload.return },
      };

    case 'UPDATE_HOTEL_ROOMS':
      return { ...state, hotel: { ...state.hotel, rooms: action.payload } };

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
