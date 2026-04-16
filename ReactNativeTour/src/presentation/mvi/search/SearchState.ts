// src/presentation/mvi/search/SearchState.ts
import {
  SearchTab,
  FlightSearchForm,
  HotelSearchForm,
  TourSearchForm,
  PackageSearchForm,
} from '../../../domain/model/SearchQuery';

export interface SearchState {
  activeTab: SearchTab;
  flight: FlightSearchForm;
  hotel: HotelSearchForm;
  tour: TourSearchForm;
  package: PackageSearchForm;
}

export const initialSearchState: SearchState = {
  activeTab: '항공',
  flight: {
    departure: '서울',
    arrival: '다낭',
    departureDate: '2026-05-01',
    returnDate: '2026-05-07',
    adults: 2,
    children: 0,
    infants: 0,
    tripType: 'round',
  },
  hotel: {
    destination: '',
    checkIn: '2026-05-01',
    checkOut: '2026-05-03',
    adults: 2,
    children: 0,
    rooms: 1,
  },
  tour: {
    destination: '',
    date: '2026-05-01',
    adults: 2,
    children: 0,
  },
  package: {
    destination: '',
    departureDate: '2026-05-01',
    returnDate: '2026-05-08',
    adults: 2,
    children: 0,
  },
};
