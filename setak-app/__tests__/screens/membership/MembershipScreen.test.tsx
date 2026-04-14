import React from 'react';
import {render} from '@testing-library/react-native';
import MembershipScreen from '../../../src/screens/membership/MembershipScreen';
import {useAuth} from '../../../src/context/AuthContext';
import {mockUser} from '../../../src/data/mockUser';

jest.mock('../../../src/context/AuthContext');

describe('MembershipScreen', () => {
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

  describe('Given 로그인된 사용자의 멤버십 페이지', () => {
    it('Then 멤버십 등급과 이름이 표시된다', () => {
      const {getAllByText, getByText} = render(<MembershipScreen />);
      expect(getAllByText('실버').length).toBeGreaterThan(0);
      expect(getByText('김세탁')).toBeTruthy();
    });

    it('Then 포인트가 표시된다', () => {
      const {getByText} = render(<MembershipScreen />);
      expect(getByText(/12,500/)).toBeTruthy();
    });

    it('Then 등급별 혜택이 표시된다', () => {
      const {getByText} = render(<MembershipScreen />);
      expect(getByText('일반')).toBeTruthy();
      expect(getByText('골드')).toBeTruthy();
    });

    it('Then 현재 등급 행이 강조 표시된다', () => {
      const {getByTestId} = render(<MembershipScreen />);
      expect(getByTestId('grade-row-실버')).toBeTruthy();
    });
  });

  describe('Given 비로그인 상태', () => {
    it('Then 로그인 안내 메시지가 표시된다', () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null, isLoggedIn: false, login: jest.fn(), logout: jest.fn(), updateProfile: jest.fn(),
      });
      const {getByText} = render(<MembershipScreen />);
      expect(getByText('로그인이 필요합니다')).toBeTruthy();
    });
  });
});
