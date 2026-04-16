import { searchReducer } from '@/presentation/mvi/search/searchReducer';
import { SearchState, initialSearchState } from '@/presentation/mvi/search/searchState';
import { SearchAction } from '@/presentation/mvi/search/searchAction';
import { MOCK_AIRPORTS } from '@/data/mock/airports.mock';

describe('searchReducer', () => {
  it('초기 상태는 isLoading=false, airports=[], query="", error=null', () => {
    expect(initialSearchState).toEqual({ isLoading: false, airports: [], query: '', error: null });
  });

  it('QueryChanged 액션이면 query가 업데이트된다', () => {
    const action: SearchAction = { type: 'QueryChanged', query: '서울' };
    const state = searchReducer(initialSearchState, action);
    expect(state.query).toBe('서울');
  });

  it('SearchAirports 액션이면 isLoading=true가 된다', () => {
    const action: SearchAction = { type: 'SearchAirports' };
    const state = searchReducer(initialSearchState, action);
    expect(state.isLoading).toBe(true);
  });

  it('AirportsLoaded 액션이면 airports가 업데이트된다', () => {
    const loading: SearchState = { ...initialSearchState, isLoading: true };
    const action: SearchAction = { type: 'AirportsLoaded', airports: MOCK_AIRPORTS };
    const state = searchReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.airports).toEqual(MOCK_AIRPORTS);
  });

  it('SearchError 액션이면 error가 설정되고 isLoading=false가 된다', () => {
    const loading: SearchState = { ...initialSearchState, isLoading: true };
    const action: SearchAction = { type: 'SearchError', error: '공항 검색 실패' };
    const state = searchReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('공항 검색 실패');
  });

  it('에러 상태에서 SearchAirports를 재시도하면 error가 null로 초기화된다', () => {
    const errorState: SearchState = { ...initialSearchState, error: '공항 검색 실패' };
    const action: SearchAction = { type: 'SearchAirports' };
    const state = searchReducer(errorState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('unknown 액션이면 기존 상태를 그대로 반환한다', () => {
    const currentState: SearchState = { ...initialSearchState, query: '서울' };
    // @ts-ignore — intentional unknown action for guard test
    const state = searchReducer(currentState, { type: 'UNKNOWN' });
    expect(state).toEqual(currentState);
  });
});
