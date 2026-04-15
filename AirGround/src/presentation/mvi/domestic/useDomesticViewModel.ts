import { useReducer, useCallback } from 'react';
import { domesticReducer } from './domesticReducer';
import { initialDomesticState } from './domesticState';
import { GetDomesticScheduleUseCase } from '@/domain/usecase/GetDomesticScheduleUseCase';
import { ScheduleRepositoryImpl } from '@/data/repository/ScheduleRepositoryImpl';

const scheduleUseCase = new GetDomesticScheduleUseCase(new ScheduleRepositoryImpl());

export function useDomesticViewModel() {
  const [state, dispatch] = useReducer(domesticReducer, initialDomesticState);

  const onQueryChange = useCallback((query: string) => {
    dispatch({ type: 'QueryChanged', query });
  }, []);

  const loadSchedules = useCallback(async (originCode: string) => {
    if (!originCode.trim()) return;
    dispatch({ type: 'LoadSchedules' });
    try {
      const schedules = await scheduleUseCase.execute(originCode, true);
      dispatch({ type: 'SchedulesLoaded', schedules });
    } catch {
      dispatch({ type: 'SchedulesError', error: '스케줄 정보를 불러오지 못했습니다.' });
    }
  }, []);

  return { state, onQueryChange, loadSchedules };
}
