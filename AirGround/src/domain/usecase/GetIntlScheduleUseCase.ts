import { IntlSchedule } from '../model/IntlSchedule';
import { ScheduleRepository } from '../repository/ScheduleRepository';
import { MOCK_INTL_SCHEDULES } from '@/data/mock/schedules.mock';

export class GetIntlScheduleUseCase {
  constructor(private readonly repo: ScheduleRepository) {}

  async execute(originCode: string, useMock = true): Promise<IntlSchedule[]> {
    if (useMock) {
      return MOCK_INTL_SCHEDULES.filter(s => s.origin === originCode.toUpperCase());
    }
    // TODO: API 연동 필요 — GET /api/v1/schedules/international?origin={originCode}
    return this.repo.getIntlSchedules(originCode);
  }
}
