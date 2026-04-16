// __tests__/screens/HomeScreen.test.tsx
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../../src/presentation/screens/HomeScreen';
import { useHomeViewModel } from '../../src/presentation/mvi/home/useHomeViewModel';

jest.mock('../../src/presentation/mvi/home/useHomeViewModel');
jest.mock('../../src/presentation/mvi/search/useSearchViewModel', () => ({
  useSearchViewModel: () => ({
    state: {
      activeTab: '항공' as const,
      flight: {
        departure: '서울',
        arrival: '다낭',
        departureDate: '2026-12-20',
        returnDate: '2026-12-25',
        adults: 2,
        children: 0,
        infants: 0,
        tripType: 'round' as const,
      },
      hotel: { destination: '', checkIn: '2026-12-20', checkOut: '2026-12-22', adults: 2, children: 0, rooms: 1 },
      tour: { destination: '', date: '2026-12-20', adults: 2, children: 0 },
      package: { destination: '', departureDate: '2026-12-20', returnDate: '2026-12-25', adults: 2, children: 0 },
    },
    selectTab: jest.fn(),
    swapCities: jest.fn(),
    updateDeparture: jest.fn(),
    updateArrival: jest.fn(),
    updatePassengers: jest.fn(),
    updateTripType: jest.fn(),
    updateFlightDate: jest.fn(),
    updateHotelDestination: jest.fn(),
    updateHotelDate: jest.fn(),
    updateHotelRooms: jest.fn(),
    updateTourDestination: jest.fn(),
    updateTourDate: jest.fn(),
    updatePackageDestination: jest.fn(),
    updatePackageDate: jest.fn(),
  }),
}));

const mockUseHomeViewModel = useHomeViewModel as jest.Mock;

const FULL_CONTENT = {
  notice: { id: 'n1', tag: '공지', message: '테스트 공지' },
  adBanner: { id: 'a1', title: '배너', subtitle: '설명', imageUrl: '', isAd: true, indicatorLabel: '1/1' },
  productSections: [],
  guideSection: { title: '가이드', tabLabel: '더보기', guides: [] },
  flightDeals: { title: '땡처리', subtitle: '특가', backgroundImageUrl: '', deals: [], buttonLabel: '더보기' },
  bannerList: [],
  nolLive: { title: 'NOL LIVE', subtitle: '라이브', lives: [] },
};

describe('HomeScreen', () => {
  beforeEach(() => {
    mockUseHomeViewModel.mockReturnValue({
      state: { isLoading: false, error: null, content: FULL_CONTENT },
      reload: jest.fn(),
    });
  });

  it('홈 화면이 정상적으로 렌더링된다', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
    expect(getByText('테스트 공지')).toBeTruthy();
    expect(getByText('배너')).toBeTruthy();
  });

  it('로딩 상태일 때 ActivityIndicator를 표시한다', () => {
    mockUseHomeViewModel.mockReturnValue({
      state: { isLoading: true, error: null, content: null },
      reload: jest.fn(),
    });

    const { UNSAFE_getByType } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('에러 상태일 때 에러 메시지와 다시 시도 버튼을 표시한다', () => {
    mockUseHomeViewModel.mockReturnValue({
      state: { isLoading: false, error: '데이터 로딩 실패', content: null },
      reload: jest.fn(),
    });

    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
    expect(getByText('데이터 로딩 실패')).toBeTruthy();
    expect(getByText('다시 시도')).toBeTruthy();
  });
});
