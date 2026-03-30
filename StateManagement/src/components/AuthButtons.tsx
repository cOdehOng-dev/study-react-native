import React from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authorize, logout } from '../slices/authSlice';
import { useAppDispatch } from '../hooks/hooks';
import useAuthActions from '../hooks/useAuthActions';

function AuthButtons() {
  const { authorize, logout } = useAuthActions();

  const onPressLogin = () => {
    authorize({
      id: 1,
      username: 'abc1111',
      displayName: '코드홍',
    });
  };
  const onPressLogout = () => {
    logout();
  };
  return (
    <View>
      <Button title="로그인" onPress={onPressLogin} />
      <Button title="로그아웃" onPress={onPressLogout} />
    </View>
  );
}

export default AuthButtons;
