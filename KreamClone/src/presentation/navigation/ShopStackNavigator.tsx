import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopStackParamList } from './types';
import ShopScreen from '../shop/ShopScreen';
import ShopBrandScreen from '../shop/ShopBrandScreen';
import ShopProductDetailScreen from '../shop/ShopProductDetailScreen';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export default function ShopStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopMain" component={ShopScreen} />
      <Stack.Screen name="ShopBrand" component={ShopBrandScreen} />
      <Stack.Screen name="ShopProductDetail" component={ShopProductDetailScreen} />
    </Stack.Navigator>
  );
}
