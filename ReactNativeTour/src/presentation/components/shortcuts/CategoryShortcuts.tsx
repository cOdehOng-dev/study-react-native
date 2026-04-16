// src/presentation/components/shortcuts/CategoryShortcuts.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export interface ShortcutItem {
  id: string;
  label: string;
  icon: string;
}

const SHORTCUTS: ShortcutItem[] = [
  { id: '1', label: '항공', icon: '✈️' },
  { id: '2', label: '해외숙소', icon: '🏨' },
  { id: '3', label: '국내숙소', icon: '🏠' },
  { id: '4', label: '투어·티켓', icon: '🎫' },
  { id: '5', label: '제주렌터카', icon: '🚗' },
  { id: '6', label: '해외패키지', icon: '🌍' },
  { id: '7', label: '국내패키지', icon: '🗺️' },
  { id: '8', label: 'AI플래너', icon: '🤖' },
  { id: '9', label: '여행캘린더', icon: '📅' },
  { id: '10', label: '연차소진', icon: '🎉' },
];

interface CategoryShortcutsProps {
  onShortcutPress?: (item: ShortcutItem) => void;
}

export function CategoryShortcuts({ onShortcutPress }: CategoryShortcutsProps) {
  const rows = [SHORTCUTS.slice(0, 5), SHORTCUTS.slice(5, 10)];

  return (
    <View style={styles.container}>
      {rows.map((row) => (
        <View key={row[0].id} style={styles.row}>
          {row.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => onShortcutPress?.(item)}
              accessibilityRole="button"
              accessibilityLabel={`${item.label} 카테고리로 이동`}
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 4,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  item: {
    width: 60,
    alignItems: 'center',
    gap: 4,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  icon: { fontSize: 22 },
  label: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    textAlign: 'center',
  },
});
