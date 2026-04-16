// src/presentation/components/common/SectionHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface SectionHeaderProps {
  title: string;
  tabLabel?: string | null;
  onTabPress?: () => void;
}

export function SectionHeader({ title, tabLabel, onTabPress }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {tabLabel && (
        <TouchableOpacity onPress={onTabPress} activeOpacity={0.7}>
          <Text style={styles.tab}>{tabLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 18,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  tab: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
});
