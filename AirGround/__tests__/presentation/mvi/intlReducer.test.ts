import { intlReducer } from '@/presentation/mvi/intl/intlReducer';
import { IntlState, initialIntlState } from '@/presentation/mvi/intl/intlState';
import { IntlAction } from '@/presentation/mvi/intl/intlAction';
import { MOCK_INTL_SCHEDULES } from '@/data/mock/schedules.mock';

describe('intlReducer', () => {
  it('초기 상태는 isLoading=false, schedules=[], query="", error=null', () => {
    expect(initialIntlState).toEqual({ isLoading: false, schedules: [], query: '', error: null });
  });

  it('QueryChanged 액션이면 query가 업데이트된다', () => {
    const action: IntlAction = { type: 'QueryChanged', query: 'ICN' };
    const state = intlReducer(initialIntlState, action);
    expect(state.query).toBe('ICN');
  });

  it('LoadSchedules 액션이면 isLoading=true가 된다', () => {
    const action: IntlAction = { type: 'LoadSchedules' };
    const state = intlReducer(initialIntlState, action);
    expect(state.isLoading).toBe(true);
  });

  it('SchedulesLoaded 액션이면 schedules가 업데이트된다', () => {
    const loading: IntlState = { ...initialIntlState, isLoading: true };
    const schedules = MOCK_INTL_SCHEDULES.filter(s => s.origin === 'ICN');
    const action: IntlAction = { type: 'SchedulesLoaded', schedules };
    const state = intlReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.schedules).toEqual(schedules);
  });

  it('SchedulesError 액션이면 error가 설정되고 isLoading=false가 된다', () => {
    const loading: IntlState = { ...initialIntlState, isLoading: true };
    const action: IntlAction = { type: 'SchedulesError', error: '국제선 조회 실패' };
    const state = intlReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('국제선 조회 실패');
  });

  it('에러 상태에서 LoadSchedules를 재시도하면 error가 null로 초기화된다', () => {
    const errorState: IntlState = { ...initialIntlState, error: '국제선 조회 실패' };
    const action: IntlAction = { type: 'LoadSchedules' };
    const state = intlReducer(errorState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('unknown 액션이면 기존 상태를 그대로 반환한다', () => {
    const currentState: IntlState = { ...initialIntlState, query: 'ICN' };
    // @ts-ignore — intentional unknown action for guard test
    const state = intlReducer(currentState, { type: 'UNKNOWN' });
    expect(state).toEqual(currentState);
  });
});
