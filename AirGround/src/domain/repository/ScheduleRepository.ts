import { DomesticSchedule } from '../model/DomesticSchedule';
import { IntlSchedule } from '../model/IntlSchedule';
export interface ScheduleRepository {
  getDomesticSchedules(originCode: string): Promise<DomesticSchedule[]>;
  getIntlSchedules(originCode: string): Promise<IntlSchedule[]>;
}
