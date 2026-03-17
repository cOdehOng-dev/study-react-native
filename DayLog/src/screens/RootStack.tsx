import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import MainTab from './MainTab';
import WriteScreen from './WriteScreen';
import { LogProps } from '../contexts/LogContext';

// 스택 네비게이터의 화면 이름과 각 화면에 전달할 파라미터 타입을 정의
// MainTab: 파라미터 없음 (undefined)
// Write: 선택적으로 LogProps 타입의 log 객체를 받음 (수정 시 기존 log 전달, 새 작성 시 생략)
export type RootStackParamList = {
  MainTab: undefined;
  Write: { log?: LogProps };
};

// navigation.navigate(), navigation.pop() 등 네비게이션 동작을 호출할 때 사용하는 타입
// useNavigation<RootStackNavigationProp>() 형태로 훅에 제네릭을 넘겨 타입 안전성을 확보
// 사용처: FeedListItem, WriteHeader, FloatingWriteButton, WriteScreen
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// 스택의 특정 화면 컴포넌트가 받는 props 타입 (route + navigation)
// Screen 제네릭으로 화면 이름을 지정하면 해당 화면의 route.params 타입이 자동으로 결정됨
// 사용처: WriteScreen에서 type Prop = RootStackScreenProps<'Write'> 형태로 사용
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

// RootStackParamList를 기반으로 타입이 지정된 스택 네비게이터 인스턴스 생성
// Stack.Navigator와 Stack.Screen 컴포넌트를 제공
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
