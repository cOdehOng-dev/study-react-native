import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../types/navigation';
import ServiceSelectScreen from '../screens/order/ServiceSelectScreen';
import QuantityScreen from '../screens/order/QuantityScreen';
import ScheduleScreen from '../screens/order/ScheduleScreen';
import AddressScreen from '../screens/order/AddressScreen';
import OrderSummaryScreen from '../screens/order/OrderSummaryScreen';

const Stack = createNativeStackNavigator<OrderStackParamList>();

const OrderNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ServiceSelect" component={ServiceSelectScreen} />
    <Stack.Screen name="Quantity" component={QuantityScreen} />
    <Stack.Screen name="Schedule" component={ScheduleScreen} />
    <Stack.Screen name="Address" component={AddressScreen} />
    <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
  </Stack.Navigator>
);

export default OrderNavigator;
