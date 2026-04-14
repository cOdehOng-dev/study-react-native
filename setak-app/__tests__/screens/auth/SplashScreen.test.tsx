import React from 'react';
import {render} from '@testing-library/react-native';
import SplashScreen from '../../../src/screens/auth/SplashScreen';
import {createNavigationMock, createRouteMock} from '../../helpers/navigationMock';

jest.useFakeTimers();

describe('SplashScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('Given SplashScreen이 마운트된 상태', () => {
    it('Then 앱 이름과 태그라인이 표시된다', () => {
      const nav = createNavigationMock();
      const {getByText} = render(
        <SplashScreen navigation={nav as any} route={createRouteMock() as any} />,
      );
      expect(getByText('세탁특공대')).toBeTruthy();
      expect(getByText('오늘도 깨끗하게')).toBeTruthy();
    });

    describe('When 2초가 경과한다', () => {
      it('Then navigation.replace("Onboarding")이 호출된다', () => {
        const nav = createNavigationMock();
        render(<SplashScreen navigation={nav as any} route={createRouteMock() as any} />);
        jest.advanceTimersByTime(2000);
        expect(nav.replace).toHaveBeenCalledWith('Onboarding');
      });
    });
  });
});
