import { IntlSchedule } from '@/domain/model/IntlSchedule';

export type IntlAction =
  | { type: 'QueryChanged'; query: string }
  | { type: 'LoadSchedules' }
  | { type: 'SchedulesLoaded'; schedules: IntlSchedule[] }
  | { type: 'SchedulesError'; error: string };
