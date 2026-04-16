// src/domain/model/SearchQuery.ts

export type SearchTab = '항공' | '숙소' | '투어·티켓' | '해외패키지';

export interface FlightSearchForm {
  departure: string;
  arrival: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  tripType: 'round' | 'oneway';
}

export interface HotelSearchForm {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export interface TourSearchForm {
  destination: string;
  date: string;
  adults: number;
  children: number;
}

export interface PackageSearchForm {
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
}

export interface SearchDefaults {
  flight: FlightSearchForm;
  hotel: HotelSearchForm;
  tour: TourSearchForm;
  package: PackageSearchForm;
}
