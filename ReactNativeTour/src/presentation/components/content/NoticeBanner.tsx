// src/presentation/components/content/NoticeBanner.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Notice } from '../../../domain/model/HomeContent';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  notice: Notice;
  onPress?: () => void;
}

export function NoticeBanner({ notice, onPress }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inner}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={notice.message}
      >
        <View style={styles.tagBox}>
          <Text style={styles.tagText}>{notice.tag}</Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>{notice.message}</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(41,41,45,0.03)',
    borderRadius: 12,
    padding: 20,
    gap: 8,
  },
  tagBox: {
    backgroundColor: colors.badgeDark,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: typography.bold,
    fontSize: 11,
    color: colors.white,
    lineHeight: 16,
  },
  message: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 19,
    flex: 1,
  },
  arrow: {
    fontFamily: typography.regular,
    fontSize: 18,
    color: colors.textPrimary,
  },
});
