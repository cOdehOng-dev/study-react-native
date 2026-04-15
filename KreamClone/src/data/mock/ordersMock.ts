import { OrderModel } from '../../domain/model/OrderModel';

export const MOCK_ORDERS: OrderModel[] = [
  {
    id: 'order001',
    productId: 'p001',
    productName: 'Nike Air Force 1 Low White',
    size: '260',
    price: 117000,
    type: '구매',
    status: '완료',
    createdAt: '2026-04-10T14:00:00Z',
  },
  {
    id: 'order002',
    productId: 'r003',
    productName: 'Adidas Yeezy 350 V2 Bone',
    size: '270',
    price: 400000,
    type: '판매',
    status: '입찰중',
    createdAt: '2026-04-12T10:00:00Z',
  },
  {
    id: 'order003',
    productId: 'p002',
    productName: 'New Balance 530 White Silver',
    size: '255',
    price: 138000,
    type: '구매',
    status: '거래중',
    createdAt: '2026-04-13T09:30:00Z',
  },
];
