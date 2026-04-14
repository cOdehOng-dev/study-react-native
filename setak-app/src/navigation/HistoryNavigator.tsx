import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HistoryStackParamList} from '../types/navigation';
import HistoryListScreen from '../screens/history/HistoryListScreen';
import HistoryDetailScreen from '../screens/history/HistoryDetailScreen';

const Stack = createNativeStackNavigator<HistoryStackParamList>();

const HistoryNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="HistoryList" component={HistoryListScreen} />
    <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
  </Stack.Navigator>
);

export default HistoryNavigator;
