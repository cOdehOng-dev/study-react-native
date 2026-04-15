import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

jest.mock('@/data/datasource/AirlineDataSource', () => ({
  loadAirlines: jest.fn().mockResolvedValue(undefined),
  resetAirlinesCache: jest.fn(),
}));

const mockReplace = jest.fn();
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ component: C }: any) => <C navigation={{ replace: mockReplace }} />,
  }),
}));

import { SplashScreen } from '@/presentation/screens/SplashScreen';
import { loadAirlines } from '@/data/datasource/AirlineDataSource';

describe('SplashScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('AIRGROUND 텍스트가 렌더된다', () => {
    const { getByText } = render(
      <SplashScreen
        navigation={{ replace: mockReplace } as any}
        route={{} as any}
      />,
    );
    expect(getByText('AIRGROUND')).toBeTruthy();
  });

  it('loadAirlines 완료 후 navigation.replace("Main")이 호출된다', async () => {
    render(
      <SplashScreen
        navigation={{ replace: mockReplace } as any}
        route={{} as any}
      />,
    );
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('Main');
    });
  });

  it('렌더 시 loadAirlines가 호출된다', async () => {
    render(
      <SplashScreen
        navigation={{ replace: mockReplace } as any}
        route={{} as any}
      />,
    );
    await waitFor(() => {
      expect(loadAirlines).toHaveBeenCalledTimes(1);
    });
  });
});
