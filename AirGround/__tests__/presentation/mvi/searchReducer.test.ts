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

  it('AirportsLoaded 액션이면 airports가 업데이트된다', () => {
    const loading: SearchState = { ...initialSearchState, isLoading: true };
    const action: SearchAction = { type: 'AirportsLoaded', airports: MOCK_AIRPORTS };
    const state = searchReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.airports).toEqual(MOCK_AIRPORTS);
  });
});
