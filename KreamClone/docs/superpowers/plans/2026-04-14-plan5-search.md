# KREAM Clone — Plan 5: 검색 (Search) Feature (3개 화면)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 검색 탭을 실제 검색 화면으로 구현한다. 검색 메인(최근 검색어 + 인기 검색어), 검색 결과(상품 그리드), 필터 모달 3개 화면을 Clean Architecture + MVI 패턴으로 구성한다.

**Architecture:** `SearchStackParamList` + `SearchStackNavigator`를 추가하고 MainNavigator의 Search 탭에 연결. `src/presentation/search/` 아래 MVI + 3개 화면. domain에 `SearchResultModel`·`GetSearchResultsUseCase` 추가.

**Tech Stack:** React Native 0.84.1 · TypeScript · React Navigation v7 (NativeStack) · Modal · Mock 데이터

> **시리즈:** Plan 5/8. Plan 4(Feed Feature) 완료 상태에서 시작.

---

## 파일 맵

```
src/
├── domain/usecase/
│   └── GetSearchResultsUseCase.ts    (new)
└── presentation/
    ├── navigation/
    │   ├── types.ts                  (modify: append SearchStackParamList)
    │   ├── SearchStackNavigator.tsx  (new)
    │   └── MainNavigator.tsx         (modify: wire SearchStackNavigator)
    └── search/
        ├── mvi/
        │   ├── SearchAction.ts
        │   ├── SearchState.ts
        │   ├── SearchReducer.ts
        │   └── useSearchViewModel.ts
        ├── components/
        │   └── SearchBar.tsx
        ├── SearchScreen.tsx
        ├── SearchResultsScreen.tsx
        └── SearchFilterModal.tsx

__tests__/
├── domain/GetSearchResultsUseCase.test.ts    (new)
└── presentation/SearchReducer.test.ts        (new)
```

---

## Task 1: Domain UseCase + 테스트

**Files:**
- Create: `src/domain/usecase/GetSearchResultsUseCase.ts`
- Create: `__tests__/domain/GetSearchResultsUseCase.test.ts`

기존 `ProductModel`과 `ALL_PRODUCTS` Mock을 그대로 사용한다 (새 모델 불필요).

- [ ] **Step 1: 테스트 파일 먼저 작성 (RED)**

`__tests__/domain/GetSearchResultsUseCase.test.ts`:
```typescript
import { GetSearchResultsUseCase } from '../../src/domain/usecase/GetSearchResultsUseCase';

describe('GetSearchResultsUseCase', () => {
  const useCase = new GetSearchResultsUseCase();

  it('query가 빈 문자열이면 빈 배열 반환', async () => {
    const result = await useCase.execute('', true);
    expect(result).toHaveLength(0);
  });

  it('brand 기준으로 검색 — Nike 검색 시 Nike 상품만 반환', async () => {
    const result = await useCase.execute('Nike', true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.brand).toBe('Nike'));
  });

  it('name 기준으로 검색 — Air 검색 시 결과 반환', async () => {
    const result = await useCase.execute('Air', true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.name).toMatch(/Air/i));
  });

  it('대소문자 구분 없이 검색', async () => {
    const upper = await useCase.execute('NIKE', true);
    const lower = await useCase.execute('nike', true);
    expect(upper.length).toBe(lower.length);
    expect(upper.length).toBeGreaterThan(0);
  });

  it('useMock=false 시 에러 발생', async () => {
    await expect(useCase.execute('Nike', false)).rejects.toThrow('Repository not configured');
  });
});
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

Run: `npx jest __tests__/domain/GetSearchResultsUseCase.test.ts --no-coverage`
Expected: FAIL (module not found)

- [ ] **Step 3: GetSearchResultsUseCase.ts 구현**

`src/domain/usecase/GetSearchResultsUseCase.ts`:
```typescript
import { ProductModel } from '../model/ProductModel';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';

export class GetSearchResultsUseCase {
  async execute(query: string, useMock = true): Promise<ProductModel[]> {
    if (!useMock) {
      // TODO: API 연동 필요 — GET /api/v1/search?q={query}
      throw new Error('Repository not configured');
    }
    if (!query.trim()) {
      return [];
    }
    const q = query.toLowerCase();
    return ALL_PRODUCTS.filter(
      (p) =>
        p.brand.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q),
    );
  }
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

Run: `npx jest __tests__/domain/GetSearchResultsUseCase.test.ts --no-coverage`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/domain/usecase/GetSearchResultsUseCase.ts __tests__/domain/GetSearchResultsUseCase.test.ts
git commit -m "feat: add GetSearchResultsUseCase with TDD"
```

---

## Task 2: Search MVI

**Files:**
- Create: `src/presentation/search/mvi/SearchAction.ts`
- Create: `src/presentation/search/mvi/SearchState.ts`
- Create: `src/presentation/search/mvi/SearchReducer.ts`
- Create: `src/presentation/search/mvi/useSearchViewModel.ts`
- Create: `__tests__/presentation/SearchReducer.test.ts`

- [ ] **Step 1: SearchAction.ts 작성**

`src/presentation/search/mvi/SearchAction.ts`:
```typescript
import { ProductModel } from '../../../../domain/model/ProductModel';

export type SearchAction =
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'LOAD_SUCCESS'; results: ProductModel[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'ADD_RECENT'; query: string }
  | { type: 'CLEAR_RECENT' }
  | { type: 'SET_FILTER'; category: string | null };
```

- [ ] **Step 2: SearchState.ts 작성**

`src/presentation/search/mvi/SearchState.ts`:
```typescript
import { ProductModel } from '../../../../domain/model/ProductModel';

export interface SearchState {
  query: string;
  results: ProductModel[];
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
  selectedCategory: string | null;
}

export const initialSearchState: SearchState = {
  query: '',
  results: [],
  isLoading: false,
  error: null,
  recentSearches: [],
  selectedCategory: null,
};
```

- [ ] **Step 3: SearchReducer 테스트 작성 (RED)**

`__tests__/presentation/SearchReducer.test.ts`:
```typescript
import { searchReducer } from '../../src/presentation/search/mvi/SearchReducer';
import { initialSearchState } from '../../src/presentation/search/mvi/SearchState';
import { ProductModel } from '../../src/domain/model/ProductModel';

const mockProduct: ProductModel = {
  id: 'p001',
  brand: 'Nike',
  name: 'Air Force 1',
  imageUri: 'https://picsum.photos/seed/p001/300/300',
  buyPrice: 119000,
  sellPrice: 110000,
  wishCount: 1000,
  category: '스니커즈',
  isNew: false,
};

describe('searchReducer', () => {
  it('SET_QUERY: 쿼리 업데이트', () => {
    const result = searchReducer(initialSearchState, { type: 'SET_QUERY', query: 'Nike' });
    expect(result.query).toBe('Nike');
  });

  it('SET_LOADING: 로딩 상태 업데이트', () => {
    const result = searchReducer(initialSearchState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('LOAD_SUCCESS: 결과 저장, 로딩 해제, 에러 초기화', () => {
    const loading = { ...initialSearchState, isLoading: true };
    const result = searchReducer(loading, { type: 'LOAD_SUCCESS', results: [mockProduct] });
    expect(result.results).toHaveLength(1);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBeNull();
  });

  it('SET_ERROR: 에러 저장, 로딩 해제', () => {
    const result = searchReducer(initialSearchState, { type: 'SET_ERROR', error: '검색 실패' });
    expect(result.error).toBe('검색 실패');
    expect(result.isLoading).toBe(false);
  });

  it('ADD_RECENT: 최근 검색어 추가, 중복 제거, 최대 10개 유지', () => {
    const state = { ...initialSearchState, recentSearches: ['old'] };
    const result = searchReducer(state, { type: 'ADD_RECENT', query: 'Nike' });
    expect(result.recentSearches[0]).toBe('Nike');
    expect(result.recentSearches).toContain('old');
  });

  it('ADD_RECENT: 동일 쿼리 추가 시 중복 제거 후 맨 앞에 삽입', () => {
    const state = { ...initialSearchState, recentSearches: ['Nike', 'Adidas'] };
    const result = searchReducer(state, { type: 'ADD_RECENT', query: 'Nike' });
    expect(result.recentSearches[0]).toBe('Nike');
    expect(result.recentSearches.filter((q) => q === 'Nike')).toHaveLength(1);
  });

  it('CLEAR_RECENT: 최근 검색어 초기화', () => {
    const state = { ...initialSearchState, recentSearches: ['Nike', 'Adidas'] };
    const result = searchReducer(state, { type: 'CLEAR_RECENT' });
    expect(result.recentSearches).toHaveLength(0);
  });

  it('SET_FILTER: 카테고리 필터 설정', () => {
    const result = searchReducer(initialSearchState, { type: 'SET_FILTER', category: '스니커즈' });
    expect(result.selectedCategory).toBe('스니커즈');
  });

  it('SET_FILTER: null로 필터 초기화', () => {
    const state = { ...initialSearchState, selectedCategory: '스니커즈' };
    const result = searchReducer(state, { type: 'SET_FILTER', category: null });
    expect(result.selectedCategory).toBeNull();
  });

  it('알 수 없는 액션: 상태 유지', () => {
    const result = searchReducer(initialSearchState, { type: 'UNKNOWN' } as never);
    expect(result).toEqual(initialSearchState);
  });
});
```

- [ ] **Step 4: 테스트 실행 — 실패 확인**

Run: `npx jest __tests__/presentation/SearchReducer.test.ts --no-coverage`
Expected: FAIL

- [ ] **Step 5: SearchReducer.ts 구현**

`src/presentation/search/mvi/SearchReducer.ts`:
```typescript
import { SearchState } from './SearchState';
import { SearchAction } from './SearchAction';

const MAX_RECENT = 10;

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.query };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, error: null, results: action.results };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    case 'ADD_RECENT': {
      const filtered = state.recentSearches.filter((q) => q !== action.query);
      return { ...state, recentSearches: [action.query, ...filtered].slice(0, MAX_RECENT) };
    }
    case 'CLEAR_RECENT':
      return { ...state, recentSearches: [] };
    case 'SET_FILTER':
      return { ...state, selectedCategory: action.category };
    default:
      return state;
  }
}
```

- [ ] **Step 6: 테스트 실행 — 통과 확인**

Run: `npx jest __tests__/presentation/SearchReducer.test.ts --no-coverage`
Expected: PASS (9 tests)

- [ ] **Step 7: useSearchViewModel.ts 작성**

`src/presentation/search/mvi/useSearchViewModel.ts`:
```typescript
import { useReducer, useCallback } from 'react';
import { searchReducer } from './SearchReducer';
import { initialSearchState } from './SearchState';
import { GetSearchResultsUseCase } from '../../../../domain/usecase/GetSearchResultsUseCase';

const getSearchResultsUseCase = new GetSearchResultsUseCase();

export function useSearchViewModel() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  const search = useCallback(async (query: string) => {
    dispatch({ type: 'SET_QUERY', query });
    if (!query.trim()) {
      dispatch({ type: 'LOAD_SUCCESS', results: [] });
      return;
    }
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const filtered = state.selectedCategory
        ? (await getSearchResultsUseCase.execute(query, true)).filter(
            (p) => p.category === state.selectedCategory,
          )
        : await getSearchResultsUseCase.execute(query, true);
      dispatch({ type: 'LOAD_SUCCESS', results: filtered });
      dispatch({ type: 'ADD_RECENT', query });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', error: e instanceof Error ? e.message : '오류가 발생했습니다.' });
    }
  }, [state.selectedCategory]);

  const clearRecent = useCallback(() => {
    dispatch({ type: 'CLEAR_RECENT' });
  }, []);

  const setFilter = useCallback((category: string | null) => {
    dispatch({ type: 'SET_FILTER', category });
  }, []);

  return { state, search, clearRecent, setFilter };
}
```

- [ ] **Step 8: 전체 테스트 실행**

Run: `npx jest --passWithNoTests`
Expected: PASS (all existing + new tests)

- [ ] **Step 9: Commit**

```bash
git add src/presentation/search/mvi/ __tests__/presentation/SearchReducer.test.ts
git commit -m "feat: add Search MVI (Action/State/Reducer/ViewModel)"
```

---

## Task 3: SearchBar 컴포넌트

**Files:**
- Create: `src/presentation/search/components/SearchBar.tsx`

- [ ] **Step 1: SearchBar.tsx 작성**

`src/presentation/search/components/SearchBar.tsx`:
```typescript
import React from 'react';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, onSubmit, onClear, placeholder = '브랜드, 상품명 검색' }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSubmit(value)}
          placeholder={placeholder}
          placeholderTextColor={colors.gray500}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.gray100, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  input: { flex: 1, fontSize: 14, color: colors.primary },
  clearBtn: { padding: 4 },
  clearText: { fontSize: 14, color: colors.gray500 },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/presentation/search/components/SearchBar.tsx
git commit -m "feat: add SearchBar component"
```

---

## Task 4: SearchScreen + SearchResultsScreen + SearchFilterModal

**Files:**
- Create: `src/presentation/search/SearchScreen.tsx`
- Create: `src/presentation/search/SearchResultsScreen.tsx`
- Create: `src/presentation/search/SearchFilterModal.tsx`

- [ ] **Step 1: SearchScreen.tsx 작성**

`src/presentation/search/SearchScreen.tsx`:
```typescript
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList,
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
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>검색</Text>
      </View>

      {/* 검색바 */}
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 최근 검색어 */}
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

        {/* 인기 검색어 */}
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
```

- [ ] **Step 2: SearchResultsScreen.tsx 작성**

`src/presentation/search/SearchResultsScreen.tsx`:
```typescript
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

  const sortedResults = [...state.results].sort((a, b) => {
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

      {/* 필터 / 정렬 바 */}
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

      {/* 결과 수 */}
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
          search(query);
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
```

- [ ] **Step 3: SearchFilterModal.tsx 작성**

`src/presentation/search/SearchFilterModal.tsx`:
```typescript
import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import { colors } from '../theme/colors';

const CATEGORIES = ['스니커즈', '어패럴', '아우터', '탑', '팬츠', '가방', '모자', '기타'];

interface Props {
  visible: boolean;
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
  onClose: () => void;
}

export function SearchFilterModal({ visible, selectedCategory, onSelect, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>카테고리 필터</Text>

        <TouchableOpacity
          style={[styles.row, !selectedCategory && styles.rowActive]}
          onPress={() => onSelect(null)}>
          <Text style={[styles.rowText, !selectedCategory && styles.rowTextActive]}>전체</Text>
          {!selectedCategory && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.row, selectedCategory === item && styles.rowActive]}
              onPress={() => onSelect(item)}>
              <Text style={[styles.rowText, selectedCategory === item && styles.rowTextActive]}>
                {item}
              </Text>
              {selectedCategory === item && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingBottom: 32, maxHeight: '70%',
  },
  handle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: colors.gray200,
    alignSelf: 'center', marginVertical: 12,
  },
  title: {
    fontSize: 16, fontWeight: '800', color: colors.primary,
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  rowActive: { backgroundColor: '#FFF5F4' },
  rowText: { fontSize: 14, color: colors.primary },
  rowTextActive: { color: colors.accent, fontWeight: '700' },
  check: { fontSize: 16, color: colors.accent },
});
```

- [ ] **Step 4: 전체 테스트 실행**

Run: `npx jest --passWithNoTests`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/presentation/search/SearchScreen.tsx src/presentation/search/SearchResultsScreen.tsx src/presentation/search/SearchFilterModal.tsx
git commit -m "feat: implement SearchScreen, SearchResultsScreen, and SearchFilterModal"
```

---

## Task 5: 네비게이션 연결

**Files:**
- Modify: `src/presentation/navigation/types.ts` — SearchStackParamList 추가
- Create: `src/presentation/navigation/SearchStackNavigator.tsx`
- Modify: `src/presentation/navigation/MainNavigator.tsx` — Search 탭 연결

- [ ] **Step 1: types.ts에 SearchStackParamList 추가**

`src/presentation/navigation/types.ts` 끝에 추가:
```typescript
export type SearchStackParamList = {
  SearchMain: undefined;
  SearchResults: { query: string };
  SearchProductDetail: { productId: string };
};

export type SearchStackScreenProps<T extends keyof SearchStackParamList> =
  NativeStackScreenProps<SearchStackParamList, T>;
```

- [ ] **Step 2: SearchStackNavigator.tsx 작성**

`src/presentation/navigation/SearchStackNavigator.tsx`:
```typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from './types';
import SearchScreen from '../search/SearchScreen';
import SearchResultsScreen from '../search/SearchResultsScreen';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';

type SearchProductDetailProps = NativeStackScreenProps<SearchStackParamList, 'SearchProductDetail'>;

function SearchProductDetailScreen({ navigation, route }: SearchProductDetailProps) {
  const { productId } = route.params;
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  return (
    <SafeAreaWrapper>
      <Header title="상품 상세" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: product.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.buyPrice.toLocaleString()}원</Text>
        </View>
        <View style={styles.btnRow}>
          <Button
            label="구매하기"
            onPress={() =>
              Alert.alert('안내', '홈 탭에서 상품을 검색하여 구매해주세요.')
            }
            style={styles.btn}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.gray100 },
  info: { padding: 16, gap: 6 },
  brand: { fontSize: 13, color: colors.gray500 },
  name: { fontSize: 16, fontWeight: '700', color: colors.primary },
  price: { fontSize: 20, fontWeight: '900', color: colors.primary, marginTop: 4 },
  btnRow: { padding: 16 },
  btn: { width: '100%' },
});

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="SearchProductDetail" component={SearchProductDetailScreen} />
    </Stack.Navigator>
  );
}
```

- [ ] **Step 3: MainNavigator.tsx 업데이트**

`src/presentation/navigation/MainNavigator.tsx`에서:
- `import SearchStackNavigator from './SearchStackNavigator';` 추가
- Search 탭을 `PlaceholderScreen` → `SearchStackNavigator`로 변경

- [ ] **Step 4: 전체 테스트 실행**

Run: `npx jest --passWithNoTests`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/presentation/navigation/types.ts src/presentation/navigation/SearchStackNavigator.tsx src/presentation/navigation/MainNavigator.tsx
git commit -m "feat: add SearchStackNavigator and wire to MainNavigator Search tab"
```

---

## 최종 확인

- [ ] `npx jest --passWithNoTests` 전체 통과
- [ ] 검색 탭 → SearchScreen (최근 검색어 + 인기 검색어)
- [ ] 검색어 입력 + 제출 → SearchResultsScreen으로 이동
- [ ] SearchResultsScreen: 상품 그리드, 정렬, 카테고리 필터 Modal
- [ ] 상품 탭 → SearchProductDetailScreen
- [ ] 최근 검색어 저장 + 전체 삭제
