export const createNavigationMock = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  popToTop: jest.fn(),
  reset: jest.fn(),
  dispatch: jest.fn(),
});

export const createRouteMock = <T extends object>(params: T = {} as T) => ({
  params,
  key: 'test-key',
  name: 'TestScreen',
});
