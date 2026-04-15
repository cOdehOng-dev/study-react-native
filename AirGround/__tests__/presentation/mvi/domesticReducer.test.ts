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

  it('SchedulesError 액션이면 error가 설정되고 isLoading=false가 된다', () => {
    const loading: DomesticState = { ...initialDomesticState, isLoading: true };
    const action: DomesticAction = { type: 'SchedulesError', error: '스케줄 조회 실패' };
    const state = domesticReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('스케줄 조회 실패');
  });

  it('에러 상태에서 LoadSchedules를 재시도하면 error가 null로 초기화된다', () => {
    const errorState: DomesticState = { ...initialDomesticState, error: '스케줄 조회 실패' };
    const action: DomesticAction = { type: 'LoadSchedules' };
    const state = domesticReducer(errorState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('unknown 액션이면 기존 상태를 그대로 반환한다', () => {
    const currentState: DomesticState = { ...initialDomesticState, query: 'GMP' };
    // @ts-ignore — intentional unknown action for guard test
    const state = domesticReducer(currentState, { type: 'UNKNOWN' });
    expect(state).toEqual(currentState);
  });
});
