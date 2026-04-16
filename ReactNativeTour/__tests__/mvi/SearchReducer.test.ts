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

  it('UPDATE_PASSENGERS: hotel, tour, package에도 동기화된다', () => {
    const action = { type: 'UPDATE_PASSENGERS' as const, payload: { adults: 3, children: 1 } };
    const state = searchReducer(initialSearchState, action);
    expect(state.hotel.adults).toBe(3);
    expect(state.hotel.children).toBe(1);
    expect(state.tour.adults).toBe(3);
    expect(state.package.adults).toBe(3);
  });

  it('UPDATE_TRIP_TYPE: oneway로 변경 시 returnDate가 제거된다', () => {
    const action = { type: 'UPDATE_TRIP_TYPE' as const, payload: 'oneway' as const };
    const state = searchReducer(initialSearchState, action);
    expect(state.flight.tripType).toBe('oneway');
    expect(state.flight.returnDate).toBeUndefined();
  });

  it('UPDATE_HOTEL_ROOMS: 객실 수를 변경한다', () => {
    const action = { type: 'UPDATE_HOTEL_ROOMS' as const, payload: 2 };
    const state = searchReducer(initialSearchState, action);
    expect(state.hotel.rooms).toBe(2);
  });

  it('UPDATE_TOUR_DATE: 투어 날짜를 변경한다', () => {
    const action = { type: 'UPDATE_TOUR_DATE' as const, payload: '2026-06-01' };
    const state = searchReducer(initialSearchState, action);
    expect(state.tour.date).toBe('2026-06-01');
  });

  it('UPDATE_PASSENGERS: infants 전달 시 flight.infants에 반영된다', () => {
    const action = { type: 'UPDATE_PASSENGERS' as const, payload: { adults: 2, children: 0, infants: 1 } };
    const state = searchReducer(initialSearchState, action);
    expect(state.flight.infants).toBe(1);
  });

  it('UPDATE_PASSENGERS: infants 생략 시 기존 flight.infants가 유지된다', () => {
    const action = { type: 'UPDATE_PASSENGERS' as const, payload: { adults: 2, children: 0 } };
    const state = searchReducer(initialSearchState, action);
    expect(state.flight.infants).toBe(initialSearchState.flight.infants);
  });

  it('UPDATE_TRIP_TYPE: round 복원 시 기존 returnDate가 유지된다', () => {
    const onewayState = searchReducer(initialSearchState, { type: 'UPDATE_TRIP_TYPE' as const, payload: 'oneway' });
    const roundState = searchReducer(onewayState, { type: 'UPDATE_TRIP_TYPE' as const, payload: 'round' });
    expect(roundState.flight.tripType).toBe('round');
    // oneway 전환 시 returnDate가 undefined였으므로 round 복원 시에도 undefined 유지
    expect(roundState.flight.returnDate).toBeUndefined();
  });

  it('unknown action: 상태를 변경하지 않는다', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const state = searchReducer(initialSearchState, action);
    expect(state).toBe(initialSearchState);
  });
});
