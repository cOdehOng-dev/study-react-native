import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../screens/RootStack';
import CustomButton from './CustomButton';

type Props = {
  isSignUp: boolean | undefined;
  isLoading: boolean;
  onSubmit: () => void;
};

function SignButtons({ isSignUp, isLoading, onSubmit }: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('SignIn', { isSignUp: true });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#6200ee" />
      </View>
    );
  } else {
    return (
      <View style={styles.buttons}>
        <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
        <CustomButton
          title={secondaryTitle}
          theme="secondary"
          onPress={onSecondaryButtonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignButtons;
