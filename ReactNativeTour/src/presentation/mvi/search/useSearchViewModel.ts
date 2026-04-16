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

  const updatePassengers = useCallback((adults: number, children: number, infants?: number) => {
    dispatch({ type: 'UPDATE_PASSENGERS', payload: { adults, children, ...(infants !== undefined && { infants }) } });
  }, []);

  const updateTripType = useCallback((tripType: 'round' | 'oneway') => {
    dispatch({ type: 'UPDATE_TRIP_TYPE', payload: tripType });
  }, []);

  const updateFlightDate = useCallback((departure: string, returnDate?: string) => {
    dispatch({ type: 'UPDATE_FLIGHT_DATE', payload: { departure, return: returnDate } });
  }, []);

  const updateTourDate = useCallback((date: string) => {
    dispatch({ type: 'UPDATE_TOUR_DATE', payload: date });
  }, []);

  const updatePackageDate = useCallback((departure: string, returnDate: string) => {
    dispatch({ type: 'UPDATE_PACKAGE_DATE', payload: { departure, return: returnDate } });
  }, []);

  const updateHotelRooms = useCallback((rooms: number) => {
    dispatch({ type: 'UPDATE_HOTEL_ROOMS', payload: rooms });
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
    updateTripType,
    updateFlightDate,
    updateTourDate,
    updatePackageDate,
    updateHotelRooms,
    updateHotelDestination,
    updateHotelDate,
    updateTourDestination,
    updatePackageDestination,
  };
}
