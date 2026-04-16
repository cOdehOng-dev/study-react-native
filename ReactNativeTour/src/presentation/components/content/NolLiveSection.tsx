// src/presentation/components/content/NolLiveSection.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NolLiveSection as NolLiveSectionType } from '../../../domain/model/HomeContent';
import { SectionHeader } from '../common/SectionHeader';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  section: NolLiveSectionType;
}

export function NolLiveSection({ section }: Props) {
  return (
    <View style={styles.container}>
      <SectionHeader title={section.title} />
      <Text style={styles.subtitle}>{section.subtitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {section.lives.map(live => (
          <TouchableOpacity
            key={live.id}
            style={styles.liveCard}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`${live.title} 라이브${live.isLive ? ' 시청 중' : ''}`}
          >
            <View style={styles.thumbnailPlaceholder}>
              {live.isLive && (
                <View style={styles.liveBadge}>
                  <Text style={styles.liveBadgeText}>LIVE</Text>
                </View>
              )}
              {!live.isLive && live.scheduledAt && (
                <View style={styles.scheduledBadge}>
                  <Text style={styles.scheduledText}>예정</Text>
                </View>
              )}
            </View>
            <View style={styles.infoArea}>
              <Text style={styles.liveTitle} numberOfLines={2}>{live.title}</Text>
              <Text style={styles.host}>{live.host}</Text>
              {live.isLive && live.viewerCount > 0 && (
                <Text style={styles.viewers}>
                  {live.viewerCount.toLocaleString()}명 시청 중
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 40,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: colors.textSecondary,
    paddingHorizontal: 20,
    marginTop: -8,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  liveCard: {
    width: 200,
  },
  thumbnailPlaceholder: {
    width: 200,
    height: 112,
    backgroundColor: colors.textPrimary,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 8,
    overflow: 'hidden',
  },
  liveBadge: {
    backgroundColor: colors.red,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  liveBadgeText: {
    fontFamily: typography.bold,
    fontSize: 10,
    color: colors.white,
  },
  scheduledBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  scheduledText: {
    fontFamily: typography.bold,
    fontSize: 10,
    color: colors.white,
  },
  infoArea: { gap: 4 },
  liveTitle: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  host: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  viewers: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.gnbInactive,
  },
});
