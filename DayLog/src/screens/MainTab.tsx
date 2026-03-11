import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FeedsScreen from './FeedsScreen';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

type BottomTabParamList = {
  Feeds: undefined;
  Calendar: undefined;
  Search: undefined;
}


const Tab = createBottomTabNavigator<BottomTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#009688',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-stream" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
