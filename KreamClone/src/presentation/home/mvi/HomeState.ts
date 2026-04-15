import { ProductModel } from '../../../domain/model/ProductModel';
import { BannerModel } from '../../../domain/model/BannerModel';

export interface HomeState {
  isLoading: boolean;
  error: string | null;
  banners: BannerModel[];
  trendingProducts: ProductModel[];
  rankingProducts: ProductModel[];
  newArrivals: ProductModel[];
  categories: string[];
  selectedCategory: string;
}

export const initialHomeState: HomeState = {
  isLoading: false,
  error: null,
  banners: [],
  trendingProducts: [],
  rankingProducts: [],
  newArrivals: [],
  categories: [],
  selectedCategory: '전체',
};
