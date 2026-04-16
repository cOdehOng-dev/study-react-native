// src/data/mapper/HomeContentMapper.ts
import { HomeContent } from '../../domain/model/HomeContent';
import { SearchDefaults } from '../../domain/model/SearchQuery';

export function mapToHomeContent(
  notice: any,
  adBanner: any,
  productSections: any,
  guideSection: any,
  flightDeals: any,
  bannerList: any,
  nolLive: any,
): HomeContent {
  return {
    notice: notice.notice,
    adBanner: adBanner.adBanner,
    productSections: productSections.sections,
    guideSection: guideSection,
    flightDeals: flightDeals,
    bannerList: bannerList.banners,
    nolLive: nolLive,
  };
}

export function mapToSearchDefaults(data: any): SearchDefaults {
  return {
    flight: {
      departure: data.flight.departure,
      arrival: data.flight.arrival,
      departureDate: data.flight.departureDate,
      returnDate: data.flight.returnDate,
      adults: data.flight.adults,
      children: data.flight.children,
      infants: data.flight.infants,
      tripType: data.flight.tripType,
    },
    hotel: {
      destination: data.hotel.destination,
      checkIn: data.hotel.checkIn,
      checkOut: data.hotel.checkOut,
      adults: data.hotel.adults,
      children: data.hotel.children,
      rooms: data.hotel.rooms,
    },
    tour: {
      destination: data.tour.destination,
      date: data.tour.date,
      adults: data.tour.adults,
      children: data.tour.children,
    },
    package: {
      destination: data.package.destination,
      departureDate: data.package.departureDate,
      returnDate: data.package.returnDate,
      adults: data.package.adults,
      children: data.package.children,
    },
  };
}
