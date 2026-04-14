import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddressScreen from '../../../src/screens/order/AddressScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useOrder} from '../../../src/context/OrderContext';

jest.mock('../../../src/context/OrderContext');
const mockSetAddress = jest.fn();

describe('AddressScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOrder as jest.Mock).mockReturnValue({
      setAddress: mockSetAddress, setItems: jest.fn(), currentOrder: {}, orderHistory: [],
      setService: jest.fn(), setSchedule: jest.fn(), submitOrder: jest.fn(), resetOrder: jest.fn(),
    });
  });

  describe('Given 저장된 주소 목록이 표시된 상태', () => {
    it('Then 저장된 주소가 표시된다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <AddressScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByText(/서울시 강남구/)).toBeTruthy();
    });

    describe('When 주소를 선택하고 다음 버튼을 누른다', () => {
      it('Then setAddress()가 호출되고 OrderSummary로 이동한다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <AddressScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText(/서울시 강남구/));
        fireEvent.press(getByText('다음'));
        expect(mockSetAddress).toHaveBeenCalledWith('서울시 강남구 테헤란로 123');
        expect(nav.navigate).toHaveBeenCalledWith('OrderSummary');
      });
    });
  });
});
