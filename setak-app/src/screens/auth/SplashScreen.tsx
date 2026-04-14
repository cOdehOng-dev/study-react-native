import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import {colors, fontSize} from '../../constants/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Onboarding'), 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🧺</Text>
      <Text style={styles.title}>세탁특공대</Text>
      <Text style={styles.tagline}>오늘도 깨끗하게</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {fontSize: 64, marginBottom: 16},
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.surface,
    marginBottom: 8,
  },
  tagline: {
    fontSize: fontSize.md,
    color: colors.surfaceSubtle,
  },
});

export default SplashScreen;
