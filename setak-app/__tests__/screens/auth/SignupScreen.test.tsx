import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignupScreen from '../../../src/screens/auth/SignupScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';
import {useAuth} from '../../../src/context/AuthContext';

jest.mock('../../../src/context/AuthContext');
const mockLogin = jest.fn();

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({login: mockLogin, isLoggedIn: false, user: null, logout: jest.fn(), updateProfile: jest.fn()});
  });

  describe('Given 1단계(전화번호)가 표시된 상태', () => {
    describe('When 인증번호 받기 버튼을 누른다', () => {
      it('Then 2단계(프로필 입력)로 전환된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <SignupScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('인증번호 받기 (mock)'));
        expect(getByText('프로필 입력')).toBeTruthy();
      });
    });
  });

  describe('Given 2단계(프로필 입력)가 표시된 상태', () => {
    describe('When 가입 완료 버튼을 누른다', () => {
      it('Then 완료 화면이 표시된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <SignupScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('인증번호 받기 (mock)'));
        fireEvent.press(getByText('가입 완료'));
        expect(getByText('가입 완료!')).toBeTruthy();
      });
    });
  });

  describe('Given 가입 완료 화면이 표시된 상태', () => {
    describe('When 시작하기 버튼을 누른다', () => {
      it('Then login()이 호출된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <SignupScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('인증번호 받기 (mock)'));
        fireEvent.press(getByText('가입 완료'));
        fireEvent.press(getByText('시작하기'));
        expect(mockLogin).toHaveBeenCalled();
      });
    });
  });
});
