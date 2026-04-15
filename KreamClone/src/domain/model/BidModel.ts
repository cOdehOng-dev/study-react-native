export type BidType = '구매' | '판매';

export interface BidModel {
  id: string;
  productId: string;
  size: string;
  price: number;
  type: BidType;
  createdAt: string;
  expiresAt: string;
}
