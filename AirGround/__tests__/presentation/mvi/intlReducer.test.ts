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

  it('SchedulesLoaded 액션이면 schedules가 업데이트된다', () => {
    const loading: IntlState = { ...initialIntlState, isLoading: true };
    const schedules = MOCK_INTL_SCHEDULES.filter(s => s.origin === 'ICN');
    const action: IntlAction = { type: 'SchedulesLoaded', schedules };
    const state = intlReducer(loading, action);
    expect(state.isLoading).toBe(false);
    expect(state.schedules).toEqual(schedules);
  });
});
