import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  message: string;
  subMessage?: string;
}

export const EmptyState: React.FC<Props> = ({ message, subMessage }) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  message: { fontSize: 16, fontWeight: '700', color: colors.primary, textAlign: 'center', marginBottom: 8 },
  subMessage: { fontSize: 14, color: colors.gray500, textAlign: 'center' },
});
