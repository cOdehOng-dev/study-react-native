// src/presentation/components/content/AdBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AdBanner as AdBannerType } from '../../../domain/model/HomeContent';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  banner: AdBannerType;
}

export function AdBanner({ banner }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text style={styles.title}>{banner.title}</Text>
        <Text style={styles.subtitle}>{banner.subtitle}</Text>
      </View>
      <View style={styles.imageArea}>
        <View style={styles.imagePlaceholder} />
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>{banner.indicatorLabel}</Text>
        </View>
        {banner.isAd && (
          <View style={styles.adBadge}>
            <Text style={styles.adText}>AD</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
  },
  textArea: {
    gap: 4,
  },
  title: {
    fontFamily: typography.bold,
    fontSize: 20,
    color: colors.white,
    lineHeight: 26,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
  },
  imageArea: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 80,
    height: 80,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 40,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  indicator: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  indicatorText: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: colors.white,
  },
  adBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  adText: {
    fontFamily: typography.bold,
    fontSize: 10,
    color: colors.white,
  },
});
