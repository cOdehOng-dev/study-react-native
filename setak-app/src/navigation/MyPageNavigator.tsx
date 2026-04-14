import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyPageStackParamList} from '../types/navigation';
import MyPageScreen from '../screens/mypage/MyPageScreen';
import ProfileEditScreen from '../screens/mypage/ProfileEditScreen';
import AddressManageScreen from '../screens/mypage/AddressManageScreen';
import NotificationScreen from '../screens/mypage/NotificationScreen';

const Stack = createNativeStackNavigator<MyPageStackParamList>();

const MyPageNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MyPageHome" component={MyPageScreen} />
    <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    <Stack.Screen name="AddressManage" component={AddressManageScreen} />
    <Stack.Screen name="Notification" component={NotificationScreen} />
  </Stack.Navigator>
);

export default MyPageNavigator;
