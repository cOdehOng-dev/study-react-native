// __tests__/mvi/SearchReducer.test.ts
import { searchReducer } from '../../src/presentation/mvi/search/SearchReducer';
import { initialSearchState } from '../../src/presentation/mvi/search/SearchState';

describe('SearchReducer', () => {
  it('SELECT_TAB: activeTab을 변경한다', () => {
    const action = { type: 'SELECT_TAB' as const, payload: '숙소' as const };
    const state = searchReducer(initialSearchState, action);
    expect(state.activeTab).toBe('숙소');
  });

  it('SWAP_FLIGHT_CITIES: 출발지와 도착지를 교체한다', () => {
    const action = { type: 'SWAP_FLIGHT_CITIES' as const };
    const state = searchReducer(initialSearchState, action);
    expect(state.flight.departure).toBe('다낭');
    expect(state.flight.arrival).toBe('서울');
  });

  it('UPDATE_FLIGHT_DEPARTURE: 출발지를 변경한다', () => {
    const action = { type: 'UPDATE_FLIGHT_DEPARTURE' as const, payload: '부산' };
    const state = searchReducer(initialSearchState, action);
    expect(state.flight.departure).toBe('부산');
  });

  it('UPDATE_PASSENGERS: 승객 수를 변경한다', () => {
    const action = { type: 'UPDATE_PASSENGERS' as const, payload: { adults: 3, children: 1 } };
    const state = searchReducer(initialSearchState, action);
    expect(state.flight.adults).toBe(3);
    expect(state.flight.children).toBe(1);
  });

  it('다른 탭 상태는 SELECT_TAB에 영향받지 않는다', () => {
    const action = { type: 'SELECT_TAB' as const, payload: '투어·티켓' as const };
    const state = searchReducer(initialSearchState, action);
    expect(state.flight.departure).toBe('서울');
    expect(state.hotel.adults).toBe(2);
  });
});
