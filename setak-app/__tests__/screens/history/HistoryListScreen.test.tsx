import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HistoryListScreen from '../../../src/screens/history/HistoryListScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useOrder} from '../../../src/context/OrderContext';
import {mockOrders} from '../../../src/data/mockOrders';

jest.mock('../../../src/context/OrderContext');

describe('HistoryListScreen', () => {
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

  describe('Given 주문 내역이 있는 상태', () => {
    it('Then 주문 목록이 표시된다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <HistoryListScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByText('일반세탁')).toBeTruthy();
      expect(getByText('배달중')).toBeTruthy();
    });

    describe('When 주문 항목을 탭한다', () => {
      it('Then HistoryDetail로 이동한다', () => {
        const nav = createNavigationMock();
        const {getByTestId} = render(
          <HistoryListScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByTestId('history-item-ord-001'));
        expect(nav.navigate).toHaveBeenCalledWith('HistoryDetail', {orderId: 'ord-001'});
      });
    });
  });
});
