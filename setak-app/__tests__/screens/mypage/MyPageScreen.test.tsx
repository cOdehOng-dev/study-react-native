import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyPageScreen from '../../../src/screens/mypage/MyPageScreen';
import {useAuth} from '../../../src/context/AuthContext';
import {mockUser} from '../../../src/data/mockUser';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';

jest.mock('../../../src/context/AuthContext');

const mockLogout = jest.fn();

describe('MyPageScreen', () => {
  const navigation = createNavigationMock();
  const route = createRouteMock();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoggedIn: true,
      login: jest.fn(),
      logout: mockLogout,
      updateProfile: jest.fn(),
    });
  });

  describe('Given 로그인된 사용자 상태', () => {
    it('Then 사용자 이름과 이메일이 표시된다', () => {
      const {getByText} = render(
        <MyPageScreen navigation={navigation as never} route={route as never} />,
      );
      expect(getByText('김세탁')).toBeTruthy();
      expect(getByText('kim@setak.com')).toBeTruthy();
    });

    describe('When 프로필 수정을 탭한다', () => {
      it('Then ProfileEdit으로 이동한다', () => {
        const {getByText} = render(
          <MyPageScreen navigation={navigation as never} route={route as never} />,
        );
        fireEvent.press(getByText('프로필 수정'));
        expect(navigation.navigate).toHaveBeenCalledWith('ProfileEdit');
      });
    });

    describe('When 로그아웃을 탭한다', () => {
      it('Then logout()이 호출된다', () => {
        const {getByText} = render(
          <MyPageScreen navigation={navigation as never} route={route as never} />,
        );
        fireEvent.press(getByText('로그아웃'));
        expect(mockLogout).toHaveBeenCalled();
      });
    });
  });

  describe('Given 비로그인 상태', () => {
    it('Then 로그인 안내 메시지가 표시된다', () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null, isLoggedIn: false, login: jest.fn(), logout: jest.fn(), updateProfile: jest.fn(),
      });
      const nav = createNavigationMock();
      const {getByText} = render(
        <MyPageScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByText('로그인이 필요합니다')).toBeTruthy();
    });
  });
});
