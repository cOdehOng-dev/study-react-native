import { useReducer, useCallback } from 'react';
import { homeReducer } from './homeReducer';
import { initialHomeState } from './homeState';
import { GetFlightStatusUseCase } from '@/domain/usecase/GetFlightStatusUseCase';
import { FlightRepositoryImpl } from '@/data/repository/FlightRepositoryImpl';

const flightUseCase = new GetFlightStatusUseCase(new FlightRepositoryImpl());

export function useHomeViewModel() {
  const [state, dispatch] = useReducer(homeReducer, initialHomeState);

  const loadFlights = useCallback(async () => {
    dispatch({ type: 'LoadFlights' });
    try {
      const flights = await flightUseCase.execute(true);
      dispatch({ type: 'FlightsLoaded', flights });
    } catch {
      dispatch({ type: 'FlightsError', error: '운항 정보를 불러오지 못했습니다.' });
    }
  }, []);

  return { state, loadFlights };
}
