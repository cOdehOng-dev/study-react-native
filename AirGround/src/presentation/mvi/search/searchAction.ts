import { AirportInfo } from '@/domain/model/AirportInfo';

export type SearchAction =
  | { type: 'QueryChanged'; query: string }
  | { type: 'SearchAirports' }
  | { type: 'AirportsLoaded'; airports: AirportInfo[] }
  | { type: 'SearchError'; error: string };
