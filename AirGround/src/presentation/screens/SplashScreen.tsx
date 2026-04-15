import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { loadAirlines } from '@/data/datasource/AirlineDataSource';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const [statusText, setStatusText] = useState('');
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();

    const init = async () => {
      try {
        setStatusText('공항정보 불러오는 중...');
        await loadAirlines();
      } catch {
        // 오류 시 빈 캐시로 계속 진행
      } finally {
        navigation.replace('Main');
      }
    };

    init();
  }, [navigation, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ring, { transform: [{ rotate }] }]} />
      <Text style={styles.logo}>AIRGROUND</Text>
      <View style={styles.footer}>
        {statusText ? (
          <>
            <ActivityIndicator color={colors.accentHome} size="small" />
            <Text style={styles.statusText}>{statusText}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.accentHome,
    borderTopColor: 'transparent',
    position: 'absolute',
  },
  logo: {
    color: colors.accentHome,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 6,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xxl * 2,
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusText: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
