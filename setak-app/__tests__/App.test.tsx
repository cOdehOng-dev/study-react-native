import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/navigation/RootNavigator', () => {
  const mockReact = require('react');
  const {View, Text} = require('react-native');
  const MockRootNavigator = () =>
    mockReact.createElement(View, null, mockReact.createElement(Text, null, 'App Root'));
  return {__esModule: true, default: MockRootNavigator};
});

describe('App', () => {
  it('renders without crashing', () => {
    const {getByText} = render(<App />);
    expect(getByText('App Root')).toBeTruthy();
  });
});
