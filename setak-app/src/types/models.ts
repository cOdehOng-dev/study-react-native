export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  membershipGrade: '일반' | '실버' | '골드';
  points: number;
}

export interface Service {
  id: string;
  name: string;
  pricePerItem: number;
  category: string;
  description: string;
  icon: string;
}

export interface OrderItem {
  serviceId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  service: Service;
  items: OrderItem[];
  status: '접수' | '수거중' | '세탁중' | '배달중' | '완료';
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  totalPrice: number;
  createdAt: string;
}

export interface CurrentOrder {
  service?: Service;
  items?: OrderItem[];
  scheduledDate?: string;
  scheduledTime?: string;
  address?: string;
}
