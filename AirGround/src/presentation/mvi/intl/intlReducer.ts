import { IntlAction } from './intlAction';
import { IntlState } from './intlState';

export function intlReducer(state: IntlState, action: IntlAction): IntlState {
  switch (action.type) {
    case 'QueryChanged': return { ...state, query: action.query };
    case 'LoadSchedules': return { ...state, isLoading: true, error: null };
    case 'SchedulesLoaded': return { ...state, isLoading: false, schedules: action.schedules };
    case 'SchedulesError': return { ...state, isLoading: false, error: action.error };
    default: return state;
  }
}
