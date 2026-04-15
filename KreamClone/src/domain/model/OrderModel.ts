export type OrderStatus = '입찰중' | '거래중' | '완료' | '취소';
export type OrderType = '구매' | '판매';

export interface OrderModel {
  id: string;
  productId: string;
  productName: string;
  size: string;
  price: number;
  type: OrderType;
  status: OrderStatus;
  createdAt: string;
}
