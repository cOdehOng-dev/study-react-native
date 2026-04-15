import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from './SafeAreaWrapper';
import { colors } from '../theme/colors';

interface Props {
  route?: { name?: string };
}

export default function PlaceholderScreen({ route }: Props) {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.text}>{route?.name ?? '화면'} 준비 중</Text>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: colors.gray500 },
});
