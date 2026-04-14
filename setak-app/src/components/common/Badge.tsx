import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, spacing, fontSize, radius} from '../../constants/theme';
import {Order} from '../../types/models';

type BadgeVariant = Order['status'];

interface BadgeProps {
  status: BadgeVariant;
}

const badgeColors: Record<BadgeVariant, {bg: string; text: string}> = {
  접수: {bg: '#EFF6FF', text: colors.primary},
  수거중: {bg: '#FEF3C7', text: '#92400E'},
  세탁중: {bg: '#F0FDF4', text: colors.success},
  배달중: {bg: '#F5F3FF', text: '#6D28D9'},
  완료: {bg: '#F1F5F9', text: colors.textSecondary},
};

const Badge: React.FC<BadgeProps> = ({status}) => {
  const {bg, text} = badgeColors[status];
  return (
    <View style={[styles.badge, {backgroundColor: bg}]}>
      <Text style={[styles.text, {color: text}]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  text: {fontSize: fontSize.xs, fontWeight: '600'},
});

export default Badge;
