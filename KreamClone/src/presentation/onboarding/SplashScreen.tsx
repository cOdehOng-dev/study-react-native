import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.logo}>KREAM</Text>
        <Text style={styles.tagline}>패션의 기준</Text>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.primary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: {
    color: colors.background,
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 8,
    marginBottom: 8,
  },
  tagline: {
    color: colors.gray500,
    fontSize: 14,
    letterSpacing: 4,
  },
});
