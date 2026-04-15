import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlightStatus } from '@/domain/model/FlightStatus';
import { StatusBadge } from './StatusBadge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const STATUS_BORDER_COLORS = {
  ON_TIME: colors.statusOnTime,
  DELAYED: colors.statusDelayed,
  IN_FLIGHT: colors.statusInFlight,
  LANDED: colors.statusLanded,
  CANCELLED: colors.statusCancelled,
};

interface Props {
  flight: FlightStatus;
}

export function FlightCard({ flight }: Props) {
  const borderColor = STATUS_BORDER_COLORS[flight.status];

  return (
    <View style={[styles.card, { borderLeftColor: borderColor }]}>
      <View style={styles.row}>
        <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
        <StatusBadge status={flight.status} delayMinutes={flight.delayMinutes} />
      </View>
      <View style={styles.routeRow}>
        <Text style={styles.airport}>{flight.origin}</Text>
        <Text style={styles.arrow}>→</Text>
        <Text style={styles.airport}>{flight.destination}</Text>
        <Text style={styles.time}>{flight.departureTime} → {flight.arrivalTime}</Text>
      </View>
      <Text style={styles.airline}>{flight.airline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  flightNumber: { color: colors.flightNumber, fontWeight: '700', fontSize: 14 },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  airport: { color: colors.textPrimary, fontWeight: '600', fontSize: 14 },
  arrow: { color: colors.textMuted, fontSize: 12 },
  time: { color: colors.textMuted, fontSize: 11, marginLeft: 'auto' },
  airline: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
});
