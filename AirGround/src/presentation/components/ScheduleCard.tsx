import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DomesticSchedule } from '@/domain/model/DomesticSchedule';
import { IntlSchedule } from '@/domain/model/IntlSchedule';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props =
  | { type: 'domestic'; schedule: DomesticSchedule }
  | { type: 'intl'; schedule: IntlSchedule };

export function ScheduleCard(props: Props) {
  const { schedule } = props;
  const isIntl = props.type === 'intl';
  const intlSchedule = isIntl ? (props.schedule as IntlSchedule) : null;
  const accentColor = isIntl ? colors.accentIntl : colors.accentDomestic;

  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <View style={styles.row}>
        <Text style={styles.flightNumber}>{schedule.flightNumber}</Text>
        <Text style={styles.days}>{schedule.operatingDays}</Text>
      </View>
      <View style={styles.routeRow}>
        <Text style={styles.airport}>{schedule.origin}</Text>
        <Text style={styles.arrow}>→</Text>
        <Text style={styles.airport}>
          {schedule.destination}
          {intlSchedule ? ` ${intlSchedule.destinationFlag}` : ''}
        </Text>
        <Text style={styles.time}>{schedule.departureTime} → {schedule.arrivalTime}</Text>
      </View>
      <Text style={styles.airline}>{schedule.airline}</Text>
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
  days: { color: colors.textMuted, fontSize: 11 },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  airport: { color: colors.textPrimary, fontWeight: '600', fontSize: 14 },
  arrow: { color: colors.textMuted, fontSize: 12 },
  time: { color: colors.textMuted, fontSize: 11, marginLeft: 'auto' },
  airline: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
});
