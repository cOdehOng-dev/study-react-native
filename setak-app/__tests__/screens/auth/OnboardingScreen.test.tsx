import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import OnboardingScreen from '../../../src/screens/auth/OnboardingScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';

describe('OnboardingScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('Given 첫 번째 슬라이드가 표시된 상태', () => {
    it('Then 첫 슬라이드 내용이 보인다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <OnboardingScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByText('문 앞에서 수거')).toBeTruthy();
    });

    describe('When 다음 버튼을 누른다', () => {
      it('Then 두 번째 슬라이드로 전환된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <OnboardingScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('다음'));
        expect(getByText('전문가 세탁')).toBeTruthy();
      });
    });

    describe('When 건너뛰기 버튼을 누른다', () => {
      it('Then navigation.replace("Login")이 호출된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <OnboardingScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('건너뛰기'));
        expect(nav.replace).toHaveBeenCalledWith('Login');
      });
    });
  });

  describe('Given 마지막 슬라이드가 표시된 상태', () => {
    describe('When 시작하기 버튼을 누른다', () => {
      it('Then navigation.replace("Login")이 호출된다', () => {
        const nav = createNavigationMock();
        const {getByText} = render(
          <OnboardingScreen navigation={nav as any} route={createRouteMock() as any} />,
        );
        fireEvent.press(getByText('다음'));
        fireEvent.press(getByText('다음'));
        fireEvent.press(getByText('시작하기'));
        expect(nav.replace).toHaveBeenCalledWith('Login');
      });
    });
  });
});
