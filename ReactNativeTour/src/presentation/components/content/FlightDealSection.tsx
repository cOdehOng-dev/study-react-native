// src/presentation/components/content/FlightDealSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlightDealSection as FlightDealSectionType } from '../../../domain/model/HomeContent';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  section: FlightDealSectionType;
}

export function FlightDealSection({ section }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.title}>{section.title}</Text>
        <Text style={styles.subtitle}>{section.subtitle}</Text>
      </View>
      <View style={styles.dealList}>
        {section.deals.map(deal => (
          <TouchableOpacity
            key={deal.id}
            style={styles.dealRow}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`${deal.departure}에서 ${deal.arrival} ${deal.price.toLocaleString()}원`}
          >
            <View style={styles.routeArea}>
              <Text style={styles.route}>
                {deal.departure} → {deal.arrival}
              </Text>
              <Text style={styles.airline}>{deal.airline} · {deal.tripType}</Text>
            </View>
            <View style={styles.priceArea}>
              {deal.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{deal.badge}</Text>
                </View>
              )}
              <Text style={styles.discountRate}>{deal.discountRate}%</Text>
              <Text style={styles.price}>{deal.price.toLocaleString()}원</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.moreBtn}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={section.buttonLabel}
      >
        <Text style={styles.moreBtnText}>{section.buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgShortcutActive,
    marginTop: 32,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  headerArea: { marginBottom: 24, gap: 6 },
  title: {
    fontFamily: typography.bold,
    fontSize: 22,
    color: colors.textPrimary,
    lineHeight: 30,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  dealList: { gap: 12 },
  dealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  routeArea: { gap: 4 },
  route: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  airline: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  priceArea: {
    alignItems: 'flex-end',
    gap: 2,
  },
  badge: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: typography.bold,
    fontSize: 10,
    color: colors.white,
  },
  discountRate: {
    fontFamily: typography.bold,
    fontSize: 14,
    color: colors.red,
  },
  price: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  moreBtn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnText: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.white,
  },
});
