import { homeReducer } from '@/presentation/mvi/home/homeReducer';
import { HomeState, initialHomeState } from '@/presentation/mvi/home/homeState';
import { HomeAction } from '@/presentation/mvi/home/homeAction';
import { MOCK_FLIGHT_STATUS } from '@/data/mock/flightStatus.mock';

describe('homeReducer', () => {
  it('초기 상태는 loading=false, flights=[], error=null이다', () => {
    expect(initialHomeState).toEqual({ isLoading: false, flights: [], error: null });
  });

  it('LoadFlights 액션이면 isLoading=true로 변경된다', () => {
    const action: HomeAction = { type: 'LoadFlights' };
    const state = homeReducer(initialHomeState, action);
    expect(state.isLoading).toBe(true);
    expect(state.flights).toEqual([]);
  });

  it('FlightsLoaded 액션이면 flights가 업데이트되고 isLoading=false가 된다', () => {
    const loadingState: HomeState = { isLoading: true, flights: [], error: null };
    const action: HomeAction = { type: 'FlightsLoaded', flights: MOCK_FLIGHT_STATUS };
    const state = homeReducer(loadingState, action);
    expect(state.isLoading).toBe(false);
    expect(state.flights).toEqual(MOCK_FLIGHT_STATUS);
    expect(state.error).toBeNull();
  });

  it('FlightsError 액션이면 error가 설정되고 isLoading=false가 된다', () => {
    const loadingState: HomeState = { isLoading: true, flights: [], error: null };
    const action: HomeAction = { type: 'FlightsError', error: '네트워크 오류' };
    const state = homeReducer(loadingState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('네트워크 오류');
  });
});
