import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

function RootStack() {
  return <Stack.Navigator></Stack.Navigator>;
}

export default RootStack;
