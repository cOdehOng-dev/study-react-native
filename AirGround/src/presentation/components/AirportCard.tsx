import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirportInfo } from '@/domain/model/AirportInfo';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface Props {
  airport: AirportInfo;
}

export function AirportCard({ airport }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.iata}>{airport.iataCode}</Text>
        <View style={styles.icaoBadge}>
          <Text style={styles.icaoText}>{airport.icaoCode}</Text>
        </View>
        <View style={styles.countryBadge}>
          <Text style={styles.country}>{airport.country}</Text>
        </View>
      </View>
      <Text style={styles.nameKo}>{airport.nameKo}</Text>
      <Text style={styles.nameEn}>{airport.nameEn}</Text>
      <View style={styles.divider} />
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>도시</Text>
          <Text style={styles.gridValue}>{airport.cityKo}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>시간대</Text>
          <Text style={styles.gridValue}>{airport.timezone}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.gridLabel}>터미널</Text>
          <Text style={styles.gridValue}>{airport.terminals.join(', ')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 6 },
  iata: { color: colors.accentSearch, fontSize: 22, fontWeight: '700' },
  icaoBadge: {
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 4, backgroundColor: `${colors.accentSearch}1a`,
    borderWidth: 1, borderColor: `${colors.accentSearch}4d`,
  },
  icaoText: { color: colors.accentSearch, fontSize: 11, fontWeight: '600' },
  countryBadge: {
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1, borderColor: `${colors.accentSearch}4d`,
    backgroundColor: `${colors.accentSearch}1a`,
  },
  country: { color: colors.accentSearch, fontSize: 11 },
  nameKo: { color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  nameEn: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '50%', marginTop: 4 },
  gridLabel: { color: colors.textMuted, fontSize: 10 },
  gridValue: { color: colors.textSecondary, fontSize: 12 },
});
