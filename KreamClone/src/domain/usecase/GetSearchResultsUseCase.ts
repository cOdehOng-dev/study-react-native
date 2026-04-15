import { ProductModel } from '../model/ProductModel';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';

export class GetSearchResultsUseCase {
  async execute(query: string, useMock = true): Promise<ProductModel[]> {
    if (!useMock) {
      // TODO: API 연동 필요 — GET /api/v1/search?q={query}
      throw new Error('Repository not configured');
    }
    if (!query.trim()) {
      return [];
    }
    const q = query.toLowerCase();
    return ALL_PRODUCTS.filter(
      (p) =>
        p.brand.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q),
    );
  }
}
