import React from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet,
  TouchableOpacity, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { useSearchViewModel } from '../mvi/search/useSearchViewModel';
import { AirportCard } from '../components/AirportCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { AirportInfo } from '@/domain/model/AirportInfo';

export function SearchScreen() {
  const { state, onQueryChange, searchAirports } = useSearchViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>공항 검색</Text>
      </View>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="도시 이름 입력 (예: 서울, Tokyo)"
          placeholderTextColor={colors.textMuted}
          value={state.query}
          onChangeText={onQueryChange}
          returnKeyType="search"
          onSubmitEditing={() => searchAirports(state.query)}
        />
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => searchAirports(state.query)}>
          <Text style={styles.searchBtnText}>검색</Text>
        </TouchableOpacity>
      </View>

      {state.query.length > 0 && state.airports.length > 0 && (
        <Text style={styles.sectionLabel}>"{state.query}" 검색 결과</Text>
      )}

      {state.isLoading ? (
        <ActivityIndicator color={colors.accentSearch} style={{ marginTop: spacing.xl }} />
      ) : (
        <FlatList<AirportInfo>
          data={state.airports}
          keyExtractor={item => item.iataCode}
          renderItem={({ item }) => <AirportCard airport={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            state.query ? <Text style={styles.empty}>검색 결과가 없습니다.</Text> : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.surface, padding: spacing.lg },
  title: { color: colors.accentSearch, fontSize: 16, fontWeight: '700', letterSpacing: 2 },
  searchRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md },
  input: {
    flex: 1, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: `${colors.accentSearch}4d`,
    borderRadius: 10, paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    color: colors.textPrimary, fontSize: 13,
  },
  searchBtn: {
    backgroundColor: `${colors.accentSearch}1a`,
    borderWidth: 1, borderColor: `${colors.accentSearch}4d`,
    borderRadius: 10, paddingHorizontal: spacing.lg, justifyContent: 'center',
  },
  searchBtnText: { color: colors.accentSearch, fontWeight: '600', fontSize: 13 },
  sectionLabel: {
    color: colors.textMuted, fontSize: 10, letterSpacing: 2,
    paddingHorizontal: spacing.lg, marginBottom: spacing.sm,
  },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
