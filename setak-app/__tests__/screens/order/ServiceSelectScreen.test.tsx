import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ServiceSelectScreen from '../../../src/screens/order/ServiceSelectScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useOrder} from '../../../src/context/OrderContext';

jest.mock('../../../src/context/OrderContext');
const mockSetService = jest.fn();

describe('ServiceSelectScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOrder as jest.Mock).mockReturnValue({
      setService: mockSetService, setItems: jest.fn(), currentOrder: {}, orderHistory: [],
      setSchedule: jest.fn(), setAddress: jest.fn(), submitOrder: jest.fn(), resetOrder: jest.fn(),
    });
  });

  describe('Given 서비스 목록이 표시된 상태', () => {
    it('Then 모든 서비스 이름이 표시된다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <ServiceSelectScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByText('일반세탁')).toBeTruthy();
      expect(getByText('드라이클리닝')).toBeTruthy();
    });

    describe('When 서비스 항목을 탭한다', () => {
      it('Then setService()가 해당 서비스로 호출되고 Quantity로 이동한다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <ServiceSelectScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('일반세탁'));
        expect(mockSetService).toHaveBeenCalledWith(expect.objectContaining({id: 'svc-001'}));
        expect(nav.navigate).toHaveBeenCalledWith('Quantity');
      });
    });
  });
});
