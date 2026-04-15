export type FlightStatusType =
  | 'ON_TIME'
  | 'DELAYED'
  | 'IN_FLIGHT'
  | 'LANDED'
  | 'CANCELLED';

export interface FlightStatus {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: FlightStatusType;
  delayMinutes?: number;
}
