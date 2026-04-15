import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/presentation/navigation/RootNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </NavigationContainer>
  );
}
