import React from 'react';
import {render, act} from '@testing-library/react-native';
import {Switch} from 'react-native';
import NotificationScreen from '../../../src/screens/mypage/NotificationScreen';
import {useAuth} from '../../../src/context/AuthContext';
import {mockUser} from '../../../src/data/mockUser';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';

jest.mock('../../../src/context/AuthContext');

describe('NotificationScreen', () => {
  const navigation = createNavigationMock();
  const route = createRouteMock();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
      updateProfile: jest.fn(),
    });
  });

  describe('Given 알림 설정 화면', () => {
    it('Then 알림 항목들이 표시된다', () => {
      const {getByText} = render(
        <NotificationScreen navigation={navigation as never} route={route as never} />,
      );
      expect(getByText('주문 알림')).toBeTruthy();
      expect(getByText('마케팅 알림')).toBeTruthy();
    });
  });

  describe('When 주문 알림 스위치를 토글한다', () => {
    it('Then 스위치 상태가 변경된다', () => {
      const nav = createNavigationMock();
      const {UNSAFE_getAllByType, rerender} = render(
        <NotificationScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      const switches = UNSAFE_getAllByType(Switch);
      expect(switches[0].props.value).toBe(true); // 주문 알림 starts on
      act(() => { switches[0].props.onValueChange(false); });
      rerender(<NotificationScreen navigation={nav as any} route={createRouteMock() as any} />);
      const updatedSwitches = UNSAFE_getAllByType(Switch);
      expect(updatedSwitches[0].props.value).toBe(false);
    });
  });
});
