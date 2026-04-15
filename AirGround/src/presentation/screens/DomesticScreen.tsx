import React from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet,
  TouchableOpacity, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { useDomesticViewModel } from '../mvi/domestic/useDomesticViewModel';
import { ScheduleCard } from '../components/ScheduleCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { DomesticSchedule } from '@/domain/model/DomesticSchedule';

export function DomesticScreen() {
  const { state, onQueryChange, loadSchedules } = useDomesticViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>국내선</Text>
      </View>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="출발 도시 코드 입력 (예: GMP, ICN)"
          placeholderTextColor={colors.textMuted}
          value={state.query}
          onChangeText={onQueryChange}
          autoCapitalize="characters"
          returnKeyType="search"
          onSubmitEditing={() => loadSchedules(state.query)}
        />
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => loadSchedules(state.query)}>
          <Text style={styles.searchBtnText}>조회</Text>
        </TouchableOpacity>
      </View>

      {state.isLoading ? (
        <ActivityIndicator color={colors.accentDomestic} style={{ marginTop: spacing.xl }} />
      ) : (
        <FlatList<DomesticSchedule>
          data={state.schedules}
          keyExtractor={item => item.flightNumber}
          renderItem={({ item }) => <ScheduleCard type="domestic" schedule={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            state.query ? <Text style={styles.empty}>해당 도시 코드의 국내선이 없습니다.</Text> : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.surface, padding: spacing.lg },
  title: { color: colors.accentDomestic, fontSize: 16, fontWeight: '700', letterSpacing: 2 },
  searchRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md },
  input: {
    flex: 1, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: `${colors.accentDomestic}4d`,
    borderRadius: 10, paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    color: colors.textPrimary, fontSize: 13,
  },
  searchBtn: {
    backgroundColor: `${colors.accentDomestic}1a`,
    borderWidth: 1, borderColor: `${colors.accentDomestic}4d`,
    borderRadius: 10, paddingHorizontal: spacing.lg, justifyContent: 'center',
  },
  searchBtnText: { color: colors.accentDomestic, fontWeight: '600', fontSize: 13 },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
