import { homeReducer } from '../../src/presentation/home/mvi/HomeReducer';
import { initialHomeState } from '../../src/presentation/home/mvi/HomeState';

describe('HomeReducer', () => {
  it('SET_LOADING true 설정', () => {
    const result = homeReducer(initialHomeState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('LOAD_SUCCESS 데이터 반영', () => {
    const mockData = {
      banners: [],
      trendingProducts: [],
      rankingProducts: [],
      newArrivals: [],
      categories: ['스니커즈'],
    };
    const result = homeReducer(initialHomeState, { type: 'LOAD_SUCCESS', data: mockData });
    expect(result.isLoading).toBe(false);
    expect(result.categories).toEqual(['스니커즈']);
  });

  it('SET_ERROR 에러 설정', () => {
    const result = homeReducer(initialHomeState, { type: 'SET_ERROR', error: '로드 실패' });
    expect(result.error).toBe('로드 실패');
    expect(result.isLoading).toBe(false);
  });

  it('SET_CATEGORY 카테고리 변경', () => {
    const result = homeReducer(initialHomeState, { type: 'SET_CATEGORY', category: '어패럴' });
    expect(result.selectedCategory).toBe('어패럴');
  });
});
