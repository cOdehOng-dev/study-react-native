import { ProductModel } from '../model/ProductModel';
import { BannerModel } from '../model/BannerModel';
import {
  MOCK_TRENDING,
  MOCK_RANKING,
  MOCK_NEW_ARRIVALS,
} from '../../data/mock/productsMock';
import { MOCK_BANNERS_DATA } from '../../data/mock/bannersMock';

export interface HomeData {
  banners: BannerModel[];
  trendingProducts: ProductModel[];
  rankingProducts: ProductModel[];
  newArrivals: ProductModel[];
  categories: string[];
}

export class GetHomeUseCase {
  async execute(useMock = true): Promise<HomeData> {
    if (useMock) {
      return {
        banners: MOCK_BANNERS_DATA,
        trendingProducts: MOCK_TRENDING,
        rankingProducts: MOCK_RANKING,
        newArrivals: MOCK_NEW_ARRIVALS,
        categories: ['스니커즈', '어패럴', '아우터', '탑', '팬츠', '가방', '모자', '기타'],
      };
    }
    // TODO: API 연동 필요 — GET /api/v1/home
    throw new Error('Repository not configured');
  }
}
