import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlightStatusType } from '@/domain/model/FlightStatus';
import { colors } from '../theme/colors';

interface Props {
  status: FlightStatusType;
  delayMinutes?: number;
}

const STATUS_LABELS: Record<FlightStatusType, string> = {
  ON_TIME: '정상',
  DELAYED: '지연',
  IN_FLIGHT: '운항 중',
  LANDED: '도착',
  CANCELLED: '결항',
};

const STATUS_COLORS: Record<FlightStatusType, string> = {
  ON_TIME: colors.statusOnTime,
  DELAYED: colors.statusDelayed,
  IN_FLIGHT: colors.statusInFlight,
  LANDED: colors.statusLanded,
  CANCELLED: colors.statusCancelled,
};

export function StatusBadge({ status, delayMinutes }: Props) {
  const color = STATUS_COLORS[status];
  const label =
    status === 'DELAYED' && delayMinutes
      ? `${delayMinutes}분 지연`
      : STATUS_LABELS[status];

  return (
    <View style={[styles.badge, { borderColor: `${color}4d`, backgroundColor: `${color}1a` }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
  text: { fontSize: 10, fontWeight: '600' },
});
