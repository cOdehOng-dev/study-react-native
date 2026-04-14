// __tests__/context/AuthContext.test.tsx
import React from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {AuthProvider, useAuth} from '../../src/context/AuthContext';
import {mockUser} from '../../src/data/mockUser';

const wrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  describe('Given 앱이 처음 실행된 상태', () => {
    it('Then isLoggedIn은 false이고 user는 null이어야 한다', () => {
      const {result} = renderHook(() => useAuth(), {wrapper});
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });

  describe('Given 로그아웃 상태', () => {
    describe('When login()을 호출한다', () => {
      it('Then isLoggedIn이 true가 되고 user가 설정된다', () => {
        const {result} = renderHook(() => useAuth(), {wrapper});
        act(() => { result.current.login(mockUser); });
        expect(result.current.isLoggedIn).toBe(true);
        expect(result.current.user?.name).toBe('김세탁');
      });
    });
  });

  describe('Given 로그인 상태', () => {
    describe('When logout()을 호출한다', () => {
      it('Then isLoggedIn이 false가 되고 user가 null이 된다', () => {
        const {result} = renderHook(() => useAuth(), {wrapper});
        act(() => { result.current.login(mockUser); });
        act(() => { result.current.logout(); });
        expect(result.current.isLoggedIn).toBe(false);
        expect(result.current.user).toBeNull();
      });
    });

    describe('When updateProfile()로 이름을 변경한다', () => {
      it('Then user.name이 새 값으로 업데이트된다', () => {
        const {result} = renderHook(() => useAuth(), {wrapper});
        act(() => { result.current.login(mockUser); });
        act(() => { result.current.updateProfile({name: '이세탁'}); });
        expect(result.current.user?.name).toBe('이세탁');
      });
    });
  });
});
