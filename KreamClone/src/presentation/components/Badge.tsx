import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Status = '거래중' | '완료' | '입찰중' | '취소';

const statusColors: Record<Status, string> = {
  '거래중': '#4CAF50',
  '완료': colors.gray500,
  '입찰중': colors.accent,
  '취소': colors.gray200,
};

interface Props {
  status: Status;
}

export const Badge: React.FC<Props> = ({ status }) => (
  <View style={[styles.container, { backgroundColor: statusColors[status] }]}>
    <Text style={styles.text}>{status}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, alignSelf: 'flex-start' },
  text: { color: colors.background, fontSize: 11, fontWeight: '700' },
});
