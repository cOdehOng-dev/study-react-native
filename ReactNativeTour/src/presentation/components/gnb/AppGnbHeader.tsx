// src/presentation/components/gnb/AppGnbHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface AppGnbHeaderProps {
  onSearchPress?: () => void;
}

export function AppGnbHeader({ onSearchPress }: AppGnbHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Text style={styles.logoText}>NOL</Text>
        <Text style={styles.logoSubText}> 인터파크투어</Text>
        <Text style={styles.arrowDown}> ▼</Text>
      </View>
      <TouchableOpacity
        style={styles.searchBtn}
        onPress={onSearchPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="검색"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.searchIcon}>⌕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoText: {
    fontFamily: typography.bold,
    fontSize: 20,
    color: colors.primary,
  },
  logoSubText: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  arrowDown: {
    fontFamily: typography.regular,
    fontSize: 10,
    color: colors.textPrimary,
    marginTop: 2,
  },
  searchBtn: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
    color: colors.textPrimary,
  },
});
