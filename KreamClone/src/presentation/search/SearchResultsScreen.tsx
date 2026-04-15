import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SearchFilterModal } from './SearchFilterModal';
import { useSearchViewModel } from './mvi/useSearchViewModel';
import { colors } from '../theme/colors';
import { SearchStackScreenProps } from '../navigation/types';

type Props = SearchStackScreenProps<'SearchResults'>;

const SORT_OPTIONS = ['관련도순', '가격낮은순', '가격높은순'];

export default function SearchResultsScreen({ navigation, route }: Props) {
  const { query } = route.params;
  const { state, search, setFilter } = useSearchViewModel();
  const [sortBy, setSortBy] = useState('관련도순');
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    search(query);
  }, [query]);

  // Apply category filter at view level (ViewModel search() is stable/unfiltered)
  const filteredResults = state.selectedCategory
    ? state.results.filter((p) => p.category === state.selectedCategory)
    : state.results;

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === '가격낮은순') return a.buyPrice - b.buyPrice;
    if (sortBy === '가격높은순') return b.buyPrice - a.buyPrice;
    return 0;
  });

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      <Header title={`"${query}" 검색결과`} onBack={() => navigation.goBack()} />

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterBtn, state.selectedCategory && styles.filterBtnActive]}
          onPress={() => setFilterVisible(true)}>
          <Text style={[styles.filterBtnText, state.selectedCategory && styles.filterBtnTextActive]}>
            {state.selectedCategory ?? '카테고리'}
          </Text>
        </TouchableOpacity>

        <View style={styles.sortRow}>
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity key={opt} onPress={() => setSortBy(opt)}>
              <Text style={[styles.sortOpt, sortBy === opt && styles.sortOptActive]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.countRow}>
        <Text style={styles.countText}>
          총 {sortedResults.length}개
          {state.selectedCategory ? ` · ${state.selectedCategory}` : ''}
        </Text>
        {state.selectedCategory && (
          <TouchableOpacity onPress={() => setFilter(null)}>
            <Text style={styles.resetFilter}>필터 초기화</Text>
          </TouchableOpacity>
        )}
      </View>

      {sortedResults.length === 0 ? (
        <EmptyState
          message={`"${query}"에 대한 검색 결과가 없습니다.`}
          subMessage="다른 검색어를 입력해보세요."
        />
      ) : (
        <FlatList
          data={sortedResults}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                brand={item.brand}
                name={item.name}
                price={item.buyPrice}
                imageUri={item.imageUri}
                onPress={() => navigation.navigate('SearchProductDetail', { productId: item.id })}
              />
            </View>
          )}
        />
      )}

      <SearchFilterModal
        visible={filterVisible}
        selectedCategory={state.selectedCategory}
        onSelect={(category) => {
          setFilter(category);
          setFilterVisible(false);
        }}
        onClose={() => setFilterVisible(false)}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  filterBtn: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: colors.gray200,
  },
  filterBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterBtnText: { fontSize: 13, color: colors.gray800 },
  filterBtnTextActive: { color: colors.background, fontWeight: '700' },
  sortRow: { flexDirection: 'row', gap: 12 },
  sortOpt: { fontSize: 12, color: colors.gray500 },
  sortOptActive: { color: colors.primary, fontWeight: '700' },
  countRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  countText: { fontSize: 12, color: colors.gray500 },
  resetFilter: { fontSize: 12, color: colors.accent },
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
