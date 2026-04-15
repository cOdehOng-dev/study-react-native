import { DomesticSchedule } from '@/domain/model/DomesticSchedule';

export type DomesticAction =
  | { type: 'QueryChanged'; query: string }
  | { type: 'LoadSchedules' }
  | { type: 'SchedulesLoaded'; schedules: DomesticSchedule[] }
  | { type: 'SchedulesError'; error: string };
