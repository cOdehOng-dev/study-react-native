import { BidModel } from '../model/BidModel';

export interface BuyBidInput {
  productId: string;
  size: string;
  price: number;
}

export class PlaceBuyBidUseCase {
  async execute(input: BuyBidInput, useMock = true): Promise<BidModel> {
    if (useMock) {
      return {
        id: `bid-buy-${Date.now()}`,
        productId: input.productId,
        size: input.size,
        price: input.price,
        type: '구매',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
    }
    // TODO: API 연동 필요 — POST /api/v1/bids/buy
    throw new Error('Repository not configured');
  }
}
