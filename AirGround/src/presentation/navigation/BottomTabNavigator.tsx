import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from '../screens/HomeScreen';
import { DomesticScreen } from '../screens/DomesticScreen';
import { IntlScreen } from '../screens/IntlScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { colors } from '../theme/colors';

export type TabParamList = {
  홈: undefined;
  국내선: undefined;
  국제선: undefined;
  공항검색: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accentHome,
        tabBarInactiveTintColor: colors.textMuted,
      }}>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: colors.accentHome,
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="국내선"
        component={DomesticScreen}
        options={{
          tabBarActiveTintColor: colors.accentDomestic,
          tabBarIcon: ({ color, size }) => <Icon name="flight-takeoff" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="국제선"
        component={IntlScreen}
        options={{
          tabBarActiveTintColor: colors.accentIntl,
          tabBarIcon: ({ color, size }) => <Icon name="public" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="공항검색"
        component={SearchScreen}
        options={{
          tabBarActiveTintColor: colors.accentSearch,
          tabBarIcon: ({ color, size }) => <Icon name="travel-explore" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
