import { DomesticAction } from './domesticAction';
import { DomesticState } from './domesticState';

export function domesticReducer(state: DomesticState, action: DomesticAction): DomesticState {
  switch (action.type) {
    case 'QueryChanged': return { ...state, query: action.query };
    case 'LoadSchedules': return { ...state, isLoading: true, error: null };
    case 'SchedulesLoaded': return { ...state, isLoading: false, schedules: action.schedules };
    case 'SchedulesError': return { ...state, isLoading: false, error: action.error };
    default: return state;
  }
}
