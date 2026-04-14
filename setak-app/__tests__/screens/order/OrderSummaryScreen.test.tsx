import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import OrderSummaryScreen from '../../../src/screens/order/OrderSummaryScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useOrder} from '../../../src/context/OrderContext';
import {mockServices} from '../../../src/data/mockServices';

jest.mock('../../../src/context/OrderContext');
const mockSubmitOrder = jest.fn();

describe('OrderSummaryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOrder as jest.Mock).mockReturnValue({
      currentOrder: {service: mockServices[0], scheduledDate: '2026-04-20', scheduledTime: '14:00', address: '서울시 강남구 테헤란로 123', items: []},
      submitOrder: mockSubmitOrder, resetOrder: jest.fn(),
      orderHistory: [], setService: jest.fn(), setItems: jest.fn(), setSchedule: jest.fn(), setAddress: jest.fn(),
    });
  });

  describe('Given 주문 정보가 입력된 상태', () => {
    it('Then 서비스명, 날짜, 주소가 표시된다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <OrderSummaryScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByText('일반세탁')).toBeTruthy();
      expect(getByText('2026-04-20 14:00')).toBeTruthy();
      expect(getByText('서울시 강남구 테헤란로 123')).toBeTruthy();
    });

    describe('When 신청 완료 버튼을 누른다', () => {
      it('Then submitOrder()가 호출된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <OrderSummaryScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('신청 완료'));
        expect(mockSubmitOrder).toHaveBeenCalled();
      });
    });
  });
});
