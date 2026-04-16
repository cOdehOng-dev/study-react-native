// src/presentation/components/content/GuideCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GuideItem } from '../../../domain/model/HomeContent';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  item: GuideItem;
}

export function GuideCard({ item }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${item.title} 가이드 보기`}
    >
      <View style={styles.imagePlaceholder} />
      <View style={styles.textArea}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: colors.divider,
    borderRadius: 12,
    marginBottom: 10,
  },
  textArea: { gap: 4 },
  category: {
    fontFamily: typography.bold,
    fontSize: 11,
    color: colors.primary,
    lineHeight: 16,
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
