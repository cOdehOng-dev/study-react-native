import { DomesticSchedule } from '../model/DomesticSchedule';
import { ScheduleRepository } from '../repository/ScheduleRepository';
import { MOCK_DOMESTIC_SCHEDULES } from '@/data/mock/schedules.mock';

export class GetDomesticScheduleUseCase {
  constructor(private readonly repo: ScheduleRepository) {}

  async execute(originCode: string, useMock = true): Promise<DomesticSchedule[]> {
    if (useMock) {
      return MOCK_DOMESTIC_SCHEDULES.filter(s => s.origin === originCode.toUpperCase());
    }
    // TODO: API 연동 필요 — GET /api/v1/schedules/domestic?origin={originCode}
    return this.repo.getDomesticSchedules(originCode);
  }
}
