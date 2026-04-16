// src/data/repository/TourRepositoryImpl.ts
import { HomeContent } from '../../domain/model/HomeContent';
import { SearchDefaults } from '../../domain/model/SearchQuery';
import { TourRepository } from '../../domain/repository/TourRepository';
import { mapToHomeContent, mapToSearchDefaults } from '../mapper/HomeContentMapper';

const noticeData = require('../mock/notice.json');
const adBannerData = require('../mock/adBanner.json');
const productSectionsData = require('../mock/productSections.json');
const guideSectionData = require('../mock/guideSection.json');
const flightDealsData = require('../mock/flightDeals.json');
const bannerListData = require('../mock/bannerList.json');
const nolLiveData = require('../mock/nolLive.json');
const searchDefaultsData = require('../mock/searchDefaults.json');

export class TourRepositoryImpl implements TourRepository {
  async getHomeContent(): Promise<HomeContent> {
    try {
      return mapToHomeContent(
        noticeData,
        adBannerData,
        productSectionsData,
        guideSectionData,
        flightDealsData,
        bannerListData,
        nolLiveData,
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(`홈 콘텐츠 로딩 실패: ${msg}`);
    }
  }

  async getSearchDefaults(): Promise<SearchDefaults> {
    try {
      return mapToSearchDefaults(searchDefaultsData);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(`검색 기본값 로딩 실패: ${msg}`);
    }
  }
}
