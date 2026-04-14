import React from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {OrderProvider, useOrder} from '../../src/context/OrderContext';
import {mockServices} from '../../src/data/mockServices';

const wrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
  <OrderProvider>{children}</OrderProvider>
);

describe('OrderContext', () => {
  describe('Given 주문이 시작되지 않은 상태', () => {
    it('Then currentOrder는 빈 객체여야 한다', () => {
      const {result} = renderHook(() => useOrder(), {wrapper});
      expect(result.current.currentOrder).toEqual({});
    });
  });

  describe('Given 주문 플로우가 진행 중인 상태', () => {
    describe('When setService()로 서비스를 선택한다', () => {
      it('Then currentOrder.service가 선택한 서비스로 설정된다', () => {
        const {result} = renderHook(() => useOrder(), {wrapper});
        act(() => { result.current.setService(mockServices[0]); });
        expect(result.current.currentOrder.service?.id).toBe('svc-001');
      });
    });

    describe('When setSchedule()로 날짜와 시간을 설정한다', () => {
      it('Then scheduledDate와 scheduledTime이 저장된다', () => {
        const {result} = renderHook(() => useOrder(), {wrapper});
        act(() => { result.current.setSchedule('2026-04-20', '14:00'); });
        expect(result.current.currentOrder.scheduledDate).toBe('2026-04-20');
        expect(result.current.currentOrder.scheduledTime).toBe('14:00');
      });
    });

    describe('When setItems()로 품목을 설정한다', () => {
      it('Then currentOrder.items가 저장된다', () => {
        const {result} = renderHook(() => useOrder(), {wrapper});
        const testItems = [{serviceId: 'svc-001', name: '셔츠', quantity: 2, price: 6000}];
        act(() => { result.current.setItems(testItems); });
        expect(result.current.currentOrder.items).toEqual(testItems);
      });
    });

    describe('When setAddress()로 주소를 설정한다', () => {
      it('Then currentOrder.address가 저장된다', () => {
        const {result} = renderHook(() => useOrder(), {wrapper});
        act(() => { result.current.setAddress('서울시 강남구 테헤란로 123'); });
        expect(result.current.currentOrder.address).toBe('서울시 강남구 테헤란로 123');
      });
    });

    describe('When submitOrder()를 호출한다', () => {
      it('Then orderHistory에 새 주문이 추가되고 currentOrder가 초기화된다', () => {
        const {result} = renderHook(() => useOrder(), {wrapper});
        const prevCount = result.current.orderHistory.length;
        act(() => {
          result.current.setService(mockServices[0]);
          result.current.setSchedule('2026-04-20', '14:00');
          result.current.setAddress('서울시 강남구 테헤란로 123');
          result.current.submitOrder();
        });
        expect(result.current.orderHistory.length).toBe(prevCount + 1);
        expect(result.current.currentOrder).toEqual({});
      });
    });

    describe('When resetOrder()를 호출한다', () => {
      it('Then currentOrder가 빈 객체로 초기화된다', () => {
        const {result} = renderHook(() => useOrder(), {wrapper});
        act(() => { result.current.setService(mockServices[0]); });
        act(() => { result.current.resetOrder(); });
        expect(result.current.currentOrder).toEqual({});
      });
    });
  });
});
