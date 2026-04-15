import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { SearchBar } from './components/SearchBar';
import { useSearchViewModel } from './mvi/useSearchViewModel';
import { colors } from '../theme/colors';
import { SearchStackScreenProps } from '../navigation/types';

const TRENDING_SEARCHES = [
  'Nike Air Force 1', 'New Balance 530', 'Adidas Samba', 'Jordan 1',
  'Yeezy 350', 'Salomon XT-6', 'Asics Gel-1130', 'Converse Chuck Taylor',
];

type Props = SearchStackScreenProps<'SearchMain'>;

export default function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const { state, search, clearRecent } = useSearchViewModel();

  const handleSubmit = (q: string) => {
    if (!q.trim()) return;
    search(q);
    navigation.navigate('SearchResults', { query: q });
  };

  const handleClear = () => setQuery('');

  return (
    <SafeAreaWrapper>
      <View style={styles.header}>
        <Text style={styles.logo}>검색</Text>
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {state.recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>최근 검색어</Text>
              <TouchableOpacity onPress={clearRecent}>
                <Text style={styles.clearAll}>전체 삭제</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chips}>
              {state.recentSearches.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.chip}
                  onPress={() => handleSubmit(item)}>
                  <Text style={styles.chipText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인기 검색어</Text>
          {TRENDING_SEARCHES.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={styles.trendingRow}
              onPress={() => handleSubmit(item)}>
              <Text style={styles.trendingRank}>{index + 1}</Text>
              <Text style={styles.trendingText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48, justifyContent: 'center', paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray200,
  },
  logo: { fontSize: 16, fontWeight: '800', color: colors.primary },
  section: { padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: colors.primary },
  clearAll: { fontSize: 13, color: colors.gray500 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.gray100,
  },
  chipText: { fontSize: 13, color: colors.primary },
  trendingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderColor: colors.gray100,
  },
  trendingRank: { fontSize: 15, fontWeight: '800', color: colors.accent, width: 24 },
  trendingText: { fontSize: 14, color: colors.primary },
});
