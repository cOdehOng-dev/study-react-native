import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {MainTabParamList} from '../types/navigation';
import {colors, fontSize} from '../constants/theme';
import HomeScreen from '../screens/home/HomeScreen';
import MembershipScreen from '../screens/membership/MembershipScreen';
import OrderNavigator from './OrderNavigator';
import HistoryNavigator from './HistoryNavigator';
import MyPageNavigator from './MyPageNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<keyof MainTabParamList, string> = {
  Home: '🏠',
  Order: '🧺',
  History: '📋',
  Membership: '💎',
  MyPage: '👤',
};

const tabLabels: Record<keyof MainTabParamList, string> = {
  Home: '홈',
  Order: '세탁신청',
  History: '이용내역',
  Membership: '멤버십',
  MyPage: '마이페이지',
};

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused}) => (
        <Text style={{fontSize: 20, opacity: focused ? 1 : 0.5}}>
          {tabIcons[route.name]}
        </Text>
      ),
      tabBarLabel: tabLabels[route.name],
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarLabelStyle: {fontSize: fontSize.xs, fontWeight: '600'},
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Order" component={OrderNavigator} />
    <Tab.Screen name="History" component={HistoryNavigator} />
    <Tab.Screen name="Membership" component={MembershipScreen} />
    <Tab.Screen name="MyPage" component={MyPageNavigator} />
  </Tab.Navigator>
);

export default MainNavigator;
