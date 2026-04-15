import { FlightStatus } from '@/domain/model/FlightStatus';

export interface HomeState {
  isLoading: boolean;
  flights: FlightStatus[];
  error: string | null;
}

export const initialHomeState: HomeState = {
  isLoading: false,
  flights: [],
  error: null,
};
