import { useReducer, useCallback } from 'react';
import { searchReducer } from './searchReducer';
import { initialSearchState } from './searchState';
import { GetAirportInfoUseCase } from '@/domain/usecase/GetAirportInfoUseCase';
import { AirportRepositoryImpl } from '@/data/repository/AirportRepositoryImpl';

const airportUseCase = new GetAirportInfoUseCase(new AirportRepositoryImpl());

export function useSearchViewModel() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  const onQueryChange = useCallback((query: string) => {
    dispatch({ type: 'QueryChanged', query });
  }, []);

  const searchAirports = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;
    dispatch({ type: 'SearchAirports' });
    try {
      const airports = await airportUseCase.execute(cityName, true);
      dispatch({ type: 'AirportsLoaded', airports });
    } catch {
      dispatch({ type: 'SearchError', error: '공항 정보를 불러오지 못했습니다.' });
    }
  }, []);

  return { state, onQueryChange, searchAirports };
}
