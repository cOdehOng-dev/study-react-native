import { ProductModel } from '../../../../domain/model/ProductModel';
import { SortOption } from './ShopState';

export type ShopAction =
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'LOAD_SUCCESS'; products: ProductModel[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_SORT'; sort: SortOption };
