import { AirportInfo } from '@/domain/model/AirportInfo';

export interface SearchState {
  isLoading: boolean;
  airports: AirportInfo[];
  query: string;
  error: string | null;
}

export const initialSearchState: SearchState = {
  isLoading: false,
  airports: [],
  query: '',
  error: null,
};
