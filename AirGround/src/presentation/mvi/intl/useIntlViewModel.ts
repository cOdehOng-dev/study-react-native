import { useReducer, useCallback } from 'react';
import { intlReducer } from './intlReducer';
import { initialIntlState } from './intlState';
import { GetIntlScheduleUseCase } from '@/domain/usecase/GetIntlScheduleUseCase';
import { ScheduleRepositoryImpl } from '@/data/repository/ScheduleRepositoryImpl';

const scheduleUseCase = new GetIntlScheduleUseCase(new ScheduleRepositoryImpl());

export function useIntlViewModel() {
  const [state, dispatch] = useReducer(intlReducer, initialIntlState);

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
      dispatch({ type: 'SchedulesError', error: '국제선 스케줄을 불러오지 못했습니다.' });
    }
  }, []);

  return { state, onQueryChange, loadSchedules };
}
