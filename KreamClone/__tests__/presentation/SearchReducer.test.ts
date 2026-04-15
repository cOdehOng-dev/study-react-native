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

  it('ADD_RECENT: 10개 초과 시 slice로 10개로 제한', () => {
    const full = Array.from({ length: 10 }, (_, i) => `query${i}`);
    const state = { ...initialSearchState, recentSearches: full };
    const result = searchReducer(state, { type: 'ADD_RECENT', query: 'newQuery' });
    expect(result.recentSearches).toHaveLength(10);
    expect(result.recentSearches[0]).toBe('newQuery');
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
