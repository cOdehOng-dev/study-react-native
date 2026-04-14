import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import QuantityScreen from '../../../src/screens/order/QuantityScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useOrder} from '../../../src/context/OrderContext';
import {mockServices} from '../../../src/data/mockServices';

jest.mock('../../../src/context/OrderContext');
const mockSetItems = jest.fn();

describe('QuantityScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOrder as jest.Mock).mockReturnValue({
      currentOrder: {service: mockServices[0]}, setItems: mockSetItems, orderHistory: [],
      setSchedule: jest.fn(), setAddress: jest.fn(), submitOrder: jest.fn(), resetOrder: jest.fn(),
    });
  });

  describe('Given 서비스가 선택된 상태', () => {
    it('Then 품목 목록이 표시되고 초기 수량은 0이다', () => {
      const nav = createNavigationMock();
      const {getAllByText} = render(
        <QuantityScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getAllByText('0').length).toBeGreaterThan(0);
    });

    describe('When 셔츠 + 버튼을 누르고 다음 버튼을 누른다', () => {
      it('Then 수량이 1로 증가한다', () => {
        const nav = createNavigationMock();
        const {getAllByText} = render(
          <QuantityScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        const plusButtons = getAllByText('+');
        fireEvent.press(plusButtons[0]);
        expect(getAllByText('1').length).toBeGreaterThan(0);
      });

      it('Then setItems()가 선택된 품목으로 호출되고 Schedule로 이동한다', () => {
        const nav = createNavigationMock();
        const {getAllByText, getByText} = render(
          <QuantityScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getAllByText('+')[0]);
        fireEvent.press(getByText('다음'));
        expect(mockSetItems).toHaveBeenCalledWith(
          expect.arrayContaining([expect.objectContaining({quantity: 1})]),
        );
        expect(nav.navigate).toHaveBeenCalledWith('Schedule');
      });
    });
  });
});
