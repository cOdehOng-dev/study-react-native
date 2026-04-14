import React from 'react';
import {render} from '@testing-library/react-native';
import HistoryDetailScreen from '../../../src/screens/history/HistoryDetailScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useOrder} from '../../../src/context/OrderContext';
import {mockOrders} from '../../../src/data/mockOrders';

jest.mock('../../../src/context/OrderContext');

describe('HistoryDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOrder as jest.Mock).mockReturnValue({
      currentOrder: {},
      orderHistory: [mockOrders[0]],
      setService: jest.fn(),
      setItems: jest.fn(),
      setSchedule: jest.fn(),
      setAddress: jest.fn(),
      submitOrder: jest.fn(),
      resetOrder: jest.fn(),
    });
  });

  const route = createRouteMock({orderId: 'ord-001'});

  describe('Given 존재하지 않는 주문 ID가 전달된 상태', () => {
    it('Then 주문을 찾을 수 없습니다 메시지가 표시된다', () => {
      (useOrder as jest.Mock).mockReturnValue({
        currentOrder: {},
        orderHistory: [],
        setService: jest.fn(),
        setItems: jest.fn(),
        setSchedule: jest.fn(),
        setAddress: jest.fn(),
        submitOrder: jest.fn(),
        resetOrder: jest.fn(),
      });
      const nav = createNavigationMock();
      const nonExistentRoute = createRouteMock({orderId: 'nonexistent'});
      const {getByText} = render(
        <HistoryDetailScreen navigation={nav as any} route={nonExistentRoute as any} />,
      );
      expect(getByText('주문을 찾을 수 없습니다.')).toBeTruthy();
    });
  });

  describe('Given 주문 상세 정보가 있는 상태', () => {
    it('Then 서비스명, 상태, 주소가 표시된다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <HistoryDetailScreen navigation={nav as any} route={route as any} />,
      );
      expect(getByText('일반세탁')).toBeTruthy();
      expect(getByText('배달중')).toBeTruthy();
      expect(getByText('서울시 강남구 테헤란로 123')).toBeTruthy();
    });

    it('Then 주문 품목과 합계가 표시된다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <HistoryDetailScreen navigation={nav as any} route={route as any} />,
      );
      expect(getByText('셔츠')).toBeTruthy();
      expect(getByText(/15,000원/)).toBeTruthy();
    });
  });
});
