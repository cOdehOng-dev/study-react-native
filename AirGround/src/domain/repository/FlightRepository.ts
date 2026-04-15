import { FlightStatus } from '../model/FlightStatus';
export interface FlightRepository {
  getRealtimeFlights(): Promise<FlightStatus[]>;
}
