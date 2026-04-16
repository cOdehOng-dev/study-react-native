// src/presentation/components/content/ProductCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProductItem, ProductSectionType } from '../../../domain/model/HomeContent';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  item: ProductItem;
  type: ProductSectionType;
}

export function ProductCard({ item, type }: Props) {
  if (type === 'horizontal_small_card') {
    return (
      <TouchableOpacity
        style={styles.smallCard}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`${item.title} 상품 보기`}
      >
        <View style={styles.smallImagePlaceholder} />
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <Text style={styles.smallTitle}>{item.title}</Text>
        <Text style={styles.smallPrice}>
          {item.price.toLocaleString()}원~
        </Text>
        {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
      </TouchableOpacity>
    );
  }

  if (type === 'horizontal_destination_chip') {
    return (
      <TouchableOpacity
        style={styles.chipCard}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`${item.label ?? item.title} 여행지 보기`}
      >
        <View style={styles.chipImagePlaceholder} />
        <Text style={styles.chipLabel}>{item.label ?? item.title}</Text>
      </TouchableOpacity>
    );
  }

  if (type === 'two_column_grid') {
    return (
      <TouchableOpacity
        style={styles.gridCard}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`${item.title} 상품 보기`}
      >
        <View style={styles.gridImagePlaceholder} />
        <View style={styles.gridTextArea}>
          <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
          {item.label && <Text style={styles.gridSubtitle}>{item.label}</Text>}
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // 'row_list' 타입은 현재 'horizontal_poi_card'와 동일 레이아웃으로 폴백 처리
  // TODO: row_list 전용 레이아웃 구현 필요
  // horizontal_poi_card (default)
  return (
    <TouchableOpacity
      style={styles.poiCard}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${item.title} 상품 보기`}
    >
      <View style={styles.poiImagePlaceholder}>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.poiInfo}>
        {item.location !== undefined && (
          <Text style={styles.poiLocation}>{item.location}</Text>
        )}
        <Text style={styles.poiTitle} numberOfLines={2}>{item.title}</Text>
        {item.rating !== undefined && (
          <Text style={styles.rating}>
            ★ {item.rating} ({item.reviewCount?.toLocaleString()})
          </Text>
        )}
        <View style={styles.priceRow}>
          {item.discountRate !== undefined && item.discountRate > 0 && (
            <Text style={styles.discountRate}>{item.discountRate}%</Text>
          )}
          <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
        </View>
        {item.originalPrice && (
          <Text style={styles.originalPrice}>
            {item.originalPrice.toLocaleString()}원
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Small card
  smallCard: {
    width: 120,
    marginRight: 8,
  },
  smallImagePlaceholder: {
    width: 120,
    height: 90,
    backgroundColor: colors.divider,
    borderRadius: 12,
    marginBottom: 8,
  },
  smallTitle: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  smallPrice: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.primary,
  },
  tag: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Chip card
  chipCard: {
    width: 80,
    alignItems: 'center',
    marginRight: 12,
  },
  chipImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: colors.bgShortcutActive,
    borderRadius: 35,
    marginBottom: 8,
  },
  chipLabel: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  // Grid card
  gridCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    margin: 4,
  },
  gridImagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: colors.divider,
  },
  gridTextArea: {
    padding: 12,
    gap: 4,
  },
  gridTitle: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  gridSubtitle: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  // POI card
  poiCard: {
    width: 200,
    marginRight: 12,
  },
  poiImagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: colors.divider,
    borderRadius: 12,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 8,
  },
  poiInfo: {
    gap: 4,
  },
  poiLocation: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  poiTitle: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  rating: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.gnbInactive,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountRate: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: colors.red,
  },
  price: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  originalPrice: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: colors.textDisabled,
    textDecorationLine: 'line-through',
  },
  // Common
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: typography.bold,
    fontSize: 11,
    color: colors.white,
    lineHeight: 16,
  },
});
