import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  title?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<Props> = ({ title, onBack, rightElement }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} style={styles.left} disabled={!onBack}>
      {onBack && <Text style={styles.backText}>{'←'}</Text>}
    </TouchableOpacity>
    <Text style={styles.title}>{title ?? ''}</Text>
    <View style={styles.right}>{rightElement ?? null}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingHorizontal: 16,
  },
  left: { width: 40 },
  right: { width: 40, alignItems: 'flex-end' },
  title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.primary },
  backText: { fontSize: 20, color: colors.primary },
});
