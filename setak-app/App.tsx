import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import {OrderProvider} from './src/context/OrderContext';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => (
  <AuthProvider>
    <OrderProvider>
      <RootNavigator />
    </OrderProvider>
  </AuthProvider>
);

export default App;
