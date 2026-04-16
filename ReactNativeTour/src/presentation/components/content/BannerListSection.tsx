// src/presentation/components/content/BannerListSection.tsx
import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { BannerItem } from '../../../domain/model/HomeContent';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

interface Props {
  banners: BannerItem[];
}

export function BannerListSection({ banners }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {banners.map(banner => (
        <TouchableOpacity
          key={banner.id}
          style={[styles.banner, { backgroundColor: banner.backgroundColor }]}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`${banner.title} 배너`}
        >
          <Text style={styles.title}>{banner.title}</Text>
          <Text style={styles.subtitle}>{banner.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  banner: {
    width: 280,
    height: 95,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: colors.white,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
});
