import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Mail, Meet, Settings } from "../TabScreens";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Settings"
      tabBarOptions={{
        labelPosition: "beside-icon",
        showLabel: false,
        style: {
          backgroundColor: "#54b7f9",
          borderTopColor: "#ffffff",
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#cfcfcf",
      }}
    >
      <Tab.Screen
        name="Mail"
        component={Mail}
        options={{
          tabBarLabel: "InBox",
          tabBarIcon: (props) =>
            TabIcon({
              ...props,
              name: props.focused ? "email" : "email-outline",
            }),
        }}
      />
      <Tab.Screen
        name="Meet"
        component={Meet}
        options={{
          tabBarLabel: "Meet",
          tabBarIcon: (props) =>
            TabIcon({
              ...props,
              name: props.focused ? "video" : "video-outline",
            }),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: (props) =>
            TabIcon({
              ...props,
              name: props.focused ? "cog" : "cog-outline",
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
