import { DomesticSchedule } from '@/domain/model/DomesticSchedule';

export interface DomesticState {
  isLoading: boolean;
  schedules: DomesticSchedule[];
  query: string;
  error: string | null;
}

export const initialDomesticState: DomesticState = {
  isLoading: false,
  schedules: [],
  query: '',
  error: null,
};
