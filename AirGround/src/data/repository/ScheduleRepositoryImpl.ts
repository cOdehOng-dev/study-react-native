import { ScheduleRepository } from '@/domain/repository/ScheduleRepository';
import { DomesticSchedule } from '@/domain/model/DomesticSchedule';
import { IntlSchedule } from '@/domain/model/IntlSchedule';

export class ScheduleRepositoryImpl implements ScheduleRepository {
  async getDomesticSchedules(_originCode: string): Promise<DomesticSchedule[]> {
    // TODO: API 연동 필요 — GET /api/v1/schedules/domestic?origin={originCode}
    return [];
  }
  async getIntlSchedules(_originCode: string): Promise<IntlSchedule[]> {
    // TODO: API 연동 필요 — GET /api/v1/schedules/international?origin={originCode}
    return [];
  }
}
