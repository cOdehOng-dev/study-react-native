import { IntlSchedule } from '@/domain/model/IntlSchedule';

export interface IntlState {
  isLoading: boolean;
  schedules: IntlSchedule[];
  query: string;
  error: string | null;
}

export const initialIntlState: IntlState = {
  isLoading: false,
  schedules: [],
  query: '',
  error: null,
};
