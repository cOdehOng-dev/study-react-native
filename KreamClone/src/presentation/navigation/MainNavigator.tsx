import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
import FeedStackNavigator from './FeedStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';
import ShopStackNavigator from './ShopStackNavigator';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray500,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.gray200,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: '홈' }} />
      <Tab.Screen name="Shop" component={ShopStackNavigator} options={{ title: 'SHOP' }} />
      <Tab.Screen name="Feed" component={FeedStackNavigator} options={{ title: '피드' }} />
      <Tab.Screen name="Search" component={SearchStackNavigator} options={{ title: '검색' }} />
      <Tab.Screen name="My" component={MyPageStackNavigator} options={{ title: 'MY' }} />
    </Tab.Navigator>
  );
}
