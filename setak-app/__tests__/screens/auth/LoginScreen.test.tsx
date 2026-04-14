import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/auth/LoginScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useAuth} from '../../../src/context/AuthContext';

jest.mock('../../../src/context/AuthContext');
const mockLogin = jest.fn();

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({login: mockLogin, isLoggedIn: false, user: null, logout: jest.fn(), updateProfile: jest.fn()});
  });

  describe('Given 로그인 화면이 표시된 상태', () => {
    it('Then 이메일·비밀번호 입력 필드와 로그인 버튼이 보인다', () => {
      const nav = createNavigationMock();
      const {getByText, getByPlaceholderText} = render(
        <LoginScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByPlaceholderText('이메일')).toBeTruthy();
      expect(getByPlaceholderText('비밀번호')).toBeTruthy();
      expect(getByText('로그인')).toBeTruthy();
    });

    describe('When 로그인 버튼을 누른다', () => {
      it('Then login()이 호출된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <LoginScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('로그인'));
        expect(mockLogin).toHaveBeenCalled();
      });
    });

    describe('When 회원가입 링크를 누른다', () => {
      it('Then navigation.navigate("Signup")이 호출된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <LoginScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('회원가입'));
        expect(nav.navigate).toHaveBeenCalledWith('Signup');
      });
    });
  });
});
