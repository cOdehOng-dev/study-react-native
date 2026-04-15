import { domesticReducer } from '@/presentation/mvi/domestic/domesticReducer';
import { DomesticState, initialDomesticState } from '@/presentation/mvi/domestic/domesticState';
import { DomesticAction } from '@/presentation/mvi/domestic/domesticAction';
import { MOCK_DOMESTIC_SCHEDULES } from '@/data/mock/schedules.mock';

describe('domesticReducer', () => {
  it('초기 상태는 isLoading=false, schedules=[], query="", error=null', () => {
    expect(initialDomesticState).toEqual({ isLoading: false, schedules: [], query: '', error: null });
  });

  it('QueryChanged 액션이면 query가 업데이트된다', () => {
    const action: DomesticAction = { type: 'QueryChanged', query: 'GMP' };
    const state = domesticReducer(initialDomesticState, action);
    expect(state.query).toBe('GMP');
  });

  it('LoadSchedules 액션이면 isLoading=true가 된다', () => {
    const action: DomesticAction = { type: 'LoadSchedules' };
    const state = domesticReducer(initialDomesticState, action);
    expect(state.isLoading).toBe(true);
  });

  it('SchedulesLoaded 액션이면 schedules가 업데이트되고 isLoading=false가 된다', () => {
    const loading: DomesticState = { ...initialDomesticState, isLoading: true };
    const schedules = MOCK_DOMESTIC_SCHEDULES.filter(s => s.origin === 'GMP');
    const action: DomesticAction = { type: 'SchedulesLoaded', schedules };
    const state = domesticReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.schedules).toEqual(schedules);
  });
});
