// src/presentation/mvi/search/SearchAction.ts
import { SearchTab } from '../../../domain/model/SearchQuery';

export type SearchAction =
  | { type: 'SELECT_TAB'; payload: SearchTab }
  | { type: 'UPDATE_FLIGHT_DEPARTURE'; payload: string }
  | { type: 'UPDATE_FLIGHT_ARRIVAL'; payload: string }
  | { type: 'UPDATE_FLIGHT_DATE'; payload: { departure: string; return: string } }
  | { type: 'UPDATE_PASSENGERS'; payload: { adults: number; children: number } }
  | { type: 'SWAP_FLIGHT_CITIES' }
  | { type: 'UPDATE_HOTEL_DESTINATION'; payload: string }
  | { type: 'UPDATE_HOTEL_DATE'; payload: { checkIn: string; checkOut: string } }
  | { type: 'UPDATE_TOUR_DESTINATION'; payload: string }
  | { type: 'UPDATE_PACKAGE_DESTINATION'; payload: string };
