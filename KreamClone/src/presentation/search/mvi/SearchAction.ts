import { ProductModel } from '../../../domain/model/ProductModel';

export type SearchAction =
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'LOAD_SUCCESS'; results: ProductModel[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'ADD_RECENT'; query: string }
  | { type: 'CLEAR_RECENT' }
  | { type: 'SET_FILTER'; category: string | null };
