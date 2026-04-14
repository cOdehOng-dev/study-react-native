import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ScheduleScreen from '../../../src/screens/order/ScheduleScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useOrder} from '../../../src/context/OrderContext';

jest.mock('../../../src/context/OrderContext');
const mockSetSchedule = jest.fn();

describe('ScheduleScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOrder as jest.Mock).mockReturnValue({
      setSchedule: mockSetSchedule, setItems: jest.fn(), currentOrder: {}, orderHistory: [],
      setService: jest.fn(), setAddress: jest.fn(), submitOrder: jest.fn(), resetOrder: jest.fn(),
    });
  });

  describe('Given 날짜와 시간이 선택되지 않은 상태', () => {
    it('Then 다음 버튼이 비활성화되어 setSchedule이 호출되지 않는다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <ScheduleScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      fireEvent.press(getByText('다음'));
      expect(mockSetSchedule).not.toHaveBeenCalled();
    });
  });

  describe('Given 날짜와 시간이 선택된 상태', () => {
    describe('When 다음 버튼을 누른다', () => {
      it('Then setSchedule()이 호출되고 Address로 이동한다', () => {
        const nav = createNavigationMock();
        const {getByText, getAllByText} = render(
          <ScheduleScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        const dateChips = getAllByText(/^\d{2}-\d{2}$/);
        fireEvent.press(dateChips[0]);
        fireEvent.press(getByText('09:00'));
        fireEvent.press(getByText('다음'));
        expect(mockSetSchedule).toHaveBeenCalled();
        expect(nav.navigate).toHaveBeenCalledWith('Address');
      });
    });
  });
});
