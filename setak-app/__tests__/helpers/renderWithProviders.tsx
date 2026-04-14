import React from 'react';
import {render} from '@testing-library/react-native';
import {AuthContext} from '../../src/context/AuthContext';
import {OrderContext} from '../../src/context/OrderContext';
import {createAuthContextMock, createOrderContextMock} from './contextMock';

interface Options {
  authOverrides?: object;
  orderOverrides?: object;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {authOverrides = {}, orderOverrides = {}}: Options = {},
) => {
  const authValue = createAuthContextMock(authOverrides);
  const orderValue = createOrderContextMock(orderOverrides);

  return {
    ...render(
      <AuthContext.Provider value={authValue as any}>
        <OrderContext.Provider value={orderValue as any}>
          {ui}
        </OrderContext.Provider>
      </AuthContext.Provider>,
    ),
    authValue,
    orderValue,
  };
};
