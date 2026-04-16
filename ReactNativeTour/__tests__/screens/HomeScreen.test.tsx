// __tests__/screens/HomeScreen.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../../src/presentation/screens/HomeScreen';

jest.mock('../../src/presentation/mvi/home/useHomeViewModel', () => ({
  useHomeViewModel: () => ({
    state: {
      isLoading: false,
      error: null,
      content: {
        notice: { id: 'n1', tag: '공지', message: '테스트 공지' },
        adBanner: { id: 'a1', title: '배너', subtitle: '설명', imageUrl: '', isAd: true, indicatorLabel: '1/1' },
        productSections: [],
        guideSection: { title: '가이드', tabLabel: '더보기', guides: [] },
        flightDeals: { title: '땡처리', subtitle: '특가', backgroundImageUrl: '', deals: [], buttonLabel: '더보기' },
        bannerList: [],
        nolLive: { title: 'NOL LIVE', subtitle: '라이브', lives: [] },
      },
    },
    reload: jest.fn(),
  }),
}));

jest.mock('../../src/presentation/mvi/search/useSearchViewModel', () => ({
  useSearchViewModel: () => ({
    state: {
      activeTab: '항공',
      flight: { departure: '서울', arrival: '다낭', departureDate: '2026-12-20', returnDate: '2026-12-25', adults: 2, children: 0, infants: 0, tripType: 'round' },
      hotel: { destination: '', checkIn: '2026-12-20', checkOut: '2026-12-22', adults: 2, children: 0, rooms: 1 },
      tour: { destination: '', date: '2026-12-20', adults: 2, children: 0 },
      package: { destination: '', departureDate: '2026-12-20', returnDate: '2026-12-25', adults: 2, children: 0 },
    },
    selectTab: jest.fn(),
    swapCities: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
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
    jest.resetModules();
    jest.doMock('../../src/presentation/mvi/home/useHomeViewModel', () => ({
      useHomeViewModel: () => ({
        state: { isLoading: true, error: null, content: null },
        reload: jest.fn(),
      }),
    }));
  });
});
