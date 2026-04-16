// src/presentation/mvi/search/useSearchViewModel.ts
import { useReducer, useCallback } from 'react';
import { SearchTab } from '../../../domain/model/SearchQuery';
import { initialSearchState } from './SearchState';
import { searchReducer } from './SearchReducer';

export function useSearchViewModel() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  const selectTab = useCallback((tab: SearchTab) => {
    dispatch({ type: 'SELECT_TAB', payload: tab });
  }, []);

  const updateDeparture = useCallback((city: string) => {
    dispatch({ type: 'UPDATE_FLIGHT_DEPARTURE', payload: city });
  }, []);

  const updateArrival = useCallback((city: string) => {
    dispatch({ type: 'UPDATE_FLIGHT_ARRIVAL', payload: city });
  }, []);

  const swapCities = useCallback(() => {
    dispatch({ type: 'SWAP_FLIGHT_CITIES' });
  }, []);

  const updatePassengers = useCallback((adults: number, children: number) => {
    dispatch({ type: 'UPDATE_PASSENGERS', payload: { adults, children } });
  }, []);

  const updateHotelDestination = useCallback((destination: string) => {
    dispatch({ type: 'UPDATE_HOTEL_DESTINATION', payload: destination });
  }, []);

  const updateHotelDate = useCallback((checkIn: string, checkOut: string) => {
    dispatch({ type: 'UPDATE_HOTEL_DATE', payload: { checkIn, checkOut } });
  }, []);

  const updateTourDestination = useCallback((destination: string) => {
    dispatch({ type: 'UPDATE_TOUR_DESTINATION', payload: destination });
  }, []);

  const updatePackageDestination = useCallback((destination: string) => {
    dispatch({ type: 'UPDATE_PACKAGE_DESTINATION', payload: destination });
  }, []);

  return {
    state,
    selectTab,
    updateDeparture,
    updateArrival,
    swapCities,
    updatePassengers,
    updateHotelDestination,
    updateHotelDate,
    updateTourDestination,
    updatePackageDestination,
  };
}
