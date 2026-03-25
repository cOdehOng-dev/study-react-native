import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import { useUserContext } from '../../contexts/UserContext';
import MainTab from './MainTab';
import { subscribeAuth } from '../../libs/auth';
import { getUser } from '../../libs/users';
import UploadScreen from './UploadScreen';
import { ImagePickerResponse } from 'react-native-image-picker';

export type RootStackPropList = {
  SignIn: { isSignUp: boolean } | undefined;
  Welcome: { uid: string };
  MainTab: undefined;
  Upload: { res: ImagePickerResponse };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackPropList>;

export type RootStackScreenProps<Screen extends keyof RootStackPropList> =
  NativeStackScreenProps<RootStackPropList, Screen>;

const Stack = createNativeStackNavigator<RootStackPropList>();

function RootStack() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) {
        return;
      }
      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }
      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{
              title: '새 게시물',
              headerBackTitle: '뒤로가기',
            }}
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
