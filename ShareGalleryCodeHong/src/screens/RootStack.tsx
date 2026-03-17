import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import { useUserContext } from '../../contexts/UserContext';
import MainTab from './MainTab';

export type RootStackPropList = {
  SignIn: { isSignUp: boolean } | undefined;
  Welcome: { uid: string };
  MainTab: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackPropList>;

export type RootStackScreenProps<Screen extends keyof RootStackPropList> =
  NativeStackScreenProps<RootStackPropList, Screen>;

const Stack = createNativeStackNavigator<RootStackPropList>();

function RootStack() {
  const { user } = useUserContext();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
