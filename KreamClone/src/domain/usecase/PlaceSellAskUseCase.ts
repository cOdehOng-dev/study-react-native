import { BidModel } from '../model/BidModel';

export interface SellAskInput {
  productId: string;
  size: string;
  price: number;
}

export class PlaceSellAskUseCase {
  async execute(input: SellAskInput, useMock = true): Promise<BidModel> {
    if (useMock) {
      return {
        id: `bid-sell-${Date.now()}`,
        productId: input.productId,
        size: input.size,
        price: input.price,
        type: '판매',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
    }
    // TODO: API 연동 필요 — POST /api/v1/asks/sell
    throw new Error('Repository not configured');
  }
}
