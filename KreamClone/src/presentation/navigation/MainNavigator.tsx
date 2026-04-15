import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
import FeedStackNavigator from './FeedStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import MyPageStackNavigator from './MyPageStackNavigator';
import ShopStackNavigator from './ShopStackNavigator';
import { colors } from '../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICON_SIZE = 20;

function getTabIcon(materialName: string) {
  return ({ color }: { color: string }) => (
    <MaterialIcons name={materialName} size={ICON_SIZE} color={color} />
  );
}

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
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: getTabIcon('home'),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'shop',
          tabBarIcon: getTabIcon('shopping-bag'),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '피드',
          tabBarIcon: getTabIcon('feed'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '검색',
          tabBarIcon: getTabIcon('search'),
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPageStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '마이',
          tabBarIcon: getTabIcon('account-circle'),
        }}
      />
    </Tab.Navigator>
  );
}
