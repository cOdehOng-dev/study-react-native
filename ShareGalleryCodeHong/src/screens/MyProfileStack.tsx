import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';

type MyProfileStackParamList = {
  MyProfile: undefined;
};

export type MyProfileStackNavigationProp =
  NativeStackNavigationProp<MyProfileStackParamList>;

export type MyProfileStackScreenProps<
  Screen extends keyof MyProfileStackParamList,
> = NativeStackScreenProps<MyProfileStackParamList, Screen>;

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    </Stack.Navigator>
  );
}

export default MyProfileStack;

const styles = StyleSheet.create({});
