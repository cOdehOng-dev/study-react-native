import { ProductModel } from '../../../../domain/model/ProductModel';

export interface SearchState {
  query: string;
  results: ProductModel[];
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
  selectedCategory: string | null;
}

export const initialSearchState: SearchState = {
  query: '',
  results: [],
  isLoading: false,
  error: null,
  recentSearches: [],
  selectedCategory: null,
};
