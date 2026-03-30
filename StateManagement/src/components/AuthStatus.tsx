import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '../CommonStyles';
import useUser from '../hooks/useUser';

function AuthStatus() {
  const user = useUser();
  return (
    <View style={commonStyles.status}>
      <Text style={commonStyles.text}>
        {user ? user.displayName : '로그인하세요'}
      </Text>
    </View>
  );
}

export default AuthStatus;
