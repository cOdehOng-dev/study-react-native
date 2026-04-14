import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProfileEditScreen from '../../../src/screens/mypage/ProfileEditScreen';
import {useAuth} from '../../../src/context/AuthContext';
import {mockUser} from '../../../src/data/mockUser';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';

jest.mock('../../../src/context/AuthContext');

const mockUpdateProfile = jest.fn();

describe('ProfileEditScreen', () => {
  const navigation = createNavigationMock();
  const route = createRouteMock();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
      updateProfile: mockUpdateProfile,
    });
  });

  describe('Given 프로필 편집 폼이 표시된 상태', () => {
    it('Then 현재 이름과 전화번호가 입력 필드에 표시된다', () => {
      const {getByDisplayValue} = render(
        <ProfileEditScreen navigation={navigation as never} route={route as never} />,
      );
      expect(getByDisplayValue('김세탁')).toBeTruthy();
      expect(getByDisplayValue('010-1234-5678')).toBeTruthy();
    });

    describe('When 저장 버튼을 누른다', () => {
      it('Then updateProfile()이 호출된다', () => {
        const {getByText} = render(
          <ProfileEditScreen navigation={navigation as never} route={route as never} />,
        );
        fireEvent.press(getByText('저장'));
        expect(mockUpdateProfile).toHaveBeenCalled();
        expect(navigation.goBack).toHaveBeenCalled();
      });
    });
  });
});
