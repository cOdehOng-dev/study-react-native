import React, {createContext, useContext, useRef, useState} from 'react';
import {CurrentOrder, Order, OrderItem, Service} from '../types/models';
import {mockOrders} from '../data/mockOrders';

interface OrderContextType {
  currentOrder: CurrentOrder;
  orderHistory: Order[];
  setService: (service: Service) => void;
  setItems: (items: OrderItem[]) => void;
  setSchedule: (date: string, time: string) => void;
  setAddress: (address: string) => void;
  submitOrder: () => void;
  resetOrder: () => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder>({});
  const [orderHistory, setOrderHistory] = useState<Order[]>(mockOrders);

  // Keep a ref so submitOrder always sees the latest currentOrder,
  // even when called in the same act() block as other setters.
  const currentOrderRef = useRef<CurrentOrder>(currentOrder);

  const setService = (service: Service) =>
    setCurrentOrder(prev => {
      const next = {...prev, service};
      currentOrderRef.current = next;
      return next;
    });

  const setItems = (items: OrderItem[]) =>
    setCurrentOrder(prev => {
      const next = {...prev, items};
      currentOrderRef.current = next;
      return next;
    });

  const setSchedule = (scheduledDate: string, scheduledTime: string) =>
    setCurrentOrder(prev => {
      const next = {...prev, scheduledDate, scheduledTime};
      currentOrderRef.current = next;
      return next;
    });

  const setAddress = (address: string) =>
    setCurrentOrder(prev => {
      const next = {...prev, address};
      currentOrderRef.current = next;
      return next;
    });

  const submitOrder = () => {
    const order = currentOrderRef.current;
    if (!order.service) return;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      service: order.service,
      items: order.items ?? [],
      status: '접수',
      scheduledDate: order.scheduledDate ?? '',
      scheduledTime: order.scheduledTime ?? '',
      address: order.address ?? '',
      totalPrice: order.items?.reduce((s, i) => s + i.price, 0) ?? 0,
      createdAt: new Date().toISOString(),
    };
    setOrderHistory(prev => [newOrder, ...prev]);
    currentOrderRef.current = {};
    setCurrentOrder({});
  };

  const resetOrder = () => {
    currentOrderRef.current = {};
    setCurrentOrder({});
  };

  return (
    <OrderContext.Provider value={{currentOrder, orderHistory, setService, setItems, setSchedule, setAddress, submitOrder, resetOrder}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
};
