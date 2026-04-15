import { FlightStatus } from '@/domain/model/FlightStatus';

export type HomeAction =
  | { type: 'LoadFlights' }
  | { type: 'FlightsLoaded'; flights: FlightStatus[] }
  | { type: 'FlightsError'; error: string };
