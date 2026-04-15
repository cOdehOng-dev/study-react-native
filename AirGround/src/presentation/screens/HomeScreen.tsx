import React, { useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, SafeAreaView,
} from 'react-native';
import { useHomeViewModel } from '../mvi/home/useHomeViewModel';
import { FlightCard } from '../components/FlightCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { FlightStatus } from '@/domain/model/FlightStatus';

export function HomeScreen() {
  const { state, loadFlights } = useHomeViewModel();

  useEffect(() => { loadFlights(); }, [loadFlights]);

  const onTime = state.flights.filter(f => f.status === 'ON_TIME').length;
  const delayed = state.flights.filter(f => f.status === 'DELAYED').length;
  const inFlight = state.flights.filter(f => f.status === 'IN_FLIGHT').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AIRGROUND</Text>
        <View style={styles.liveRow}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>실시간</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { borderColor: `${colors.accentHome}33` }]}>
          <Text style={[styles.summaryNum, { color: colors.accentHome }]}>{inFlight}</Text>
          <Text style={styles.summaryLabel}>운항 중</Text>
        </View>
        <View style={[styles.summaryCard, { borderColor: `${colors.statusDelayed}33` }]}>
          <Text style={[styles.summaryNum, { color: colors.statusDelayed }]}>{delayed}</Text>
          <Text style={styles.summaryLabel}>지연</Text>
        </View>
        <View style={[styles.summaryCard, { borderColor: `${colors.statusOnTime}33` }]}>
          <Text style={[styles.summaryNum, { color: colors.statusOnTime }]}>{onTime}</Text>
          <Text style={styles.summaryLabel}>정상</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>대한민국 국적기 실시간</Text>

      {state.isLoading ? (
        <ActivityIndicator color={colors.accentHome} style={{ marginTop: spacing.xl }} />
      ) : (
        <FlatList<FlightStatus>
          data={state.flights}
          keyExtractor={item => item.flightNumber}
          renderItem={({ item }) => <FlightCard flight={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  title: { color: colors.accentHome, fontSize: 16, fontWeight: '700', letterSpacing: 3 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accentHome },
  liveText: { color: colors.textMuted, fontSize: 11 },
  summaryRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md },
  summaryCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: 8,
    padding: spacing.md, alignItems: 'center', borderWidth: 1,
  },
  summaryNum: { fontSize: 22, fontWeight: '700' },
  summaryLabel: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  sectionLabel: {
    color: colors.textMuted, fontSize: 10, letterSpacing: 2,
    paddingHorizontal: spacing.lg, marginBottom: spacing.sm,
  },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
