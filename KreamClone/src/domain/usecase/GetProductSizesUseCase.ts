import { SizeModel } from '../model/SizeModel';
import { MOCK_SIZES } from '../../data/mock/sizesMock';

export class GetProductSizesUseCase {
  async execute(productId: string, useMock = true): Promise<SizeModel[]> {
    if (useMock) {
      return MOCK_SIZES[productId] ?? MOCK_SIZES['default'];
    }
    // TODO: API 연동 필요 — GET /api/v1/products/{productId}/sizes
    throw new Error('Repository not configured');
  }
}
