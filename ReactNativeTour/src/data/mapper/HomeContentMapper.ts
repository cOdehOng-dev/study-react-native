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
  return data as SearchDefaults;
}
