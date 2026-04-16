// src/domain/model/HomeContent.ts

export interface Notice {
  id: string;
  tag: string;
  message: string;
}

export interface AdBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  isAd: boolean;
  indicatorLabel: string;
}

export type ProductSectionType =
  | 'horizontal_small_card'
  | 'horizontal_poi_card'
  | 'horizontal_destination_chip'
  | 'two_column_grid'
  | 'row_list';

export interface ProductItem {
  id: string;
  title: string;
  location?: string;
  destination?: string;
  departureCity?: string;
  price: number;
  originalPrice?: number | null;
  discountRate?: number | null;
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  badge?: string | null;
  isFreeCancellation?: boolean;
  label?: string;
  tag?: string;
}

export interface ProductSection {
  id: string;
  title: string;
  tabLabel: string | null;
  type: ProductSectionType;
  items: ProductItem[];
}

export interface GuideItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
}

export interface GuideSection {
  title: string;
  tabLabel: string;
  guides: GuideItem[];
}

export interface FlightDeal {
  id: string;
  departure: string;
  departureCode: string;
  arrival: string;
  arrivalCode: string;
  departureDate: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  airline: string;
  tripType: string;
  badge: string | null;
}

export interface FlightDealSection {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  deals: FlightDeal[];
  buttonLabel: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  backgroundColor: string;
}

export interface NolLiveItem {
  id: string;
  title: string;
  host: string;
  viewerCount: number;
  thumbnailUrl: string;
  isLive: boolean;
  scheduledAt: string | null;
}

export interface NolLiveSection {
  title: string;
  subtitle: string;
  lives: NolLiveItem[];
}

export interface HomeContent {
  notice: Notice;
  adBanner: AdBanner;
  productSections: ProductSection[];
  guideSection: GuideSection;
  flightDeals: FlightDealSection;
  bannerList: BannerItem[];
  nolLive: NolLiveSection;
}
