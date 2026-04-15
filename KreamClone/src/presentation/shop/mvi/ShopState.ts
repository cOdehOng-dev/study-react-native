import { ProductModel } from '../../../domain/model/ProductModel';

export type SortOption = 'default' | 'price_asc' | 'price_desc' | 'popular';

export interface ShopState {
  products: ProductModel[];
  selectedCategory: string;
  sort: SortOption;
  isLoading: boolean;
  error: string | null;
}

export const initialShopState: ShopState = {
  products: [],
  selectedCategory: '전체',
  sort: 'default',
  isLoading: false,
  error: null,
};
