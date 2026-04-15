import { GetIntlScheduleUseCase } from '@/domain/usecase/GetIntlScheduleUseCase';
import { ScheduleRepository } from '@/domain/repository/ScheduleRepository';

const mockRepo: ScheduleRepository = {
  getDomesticSchedules: jest.fn().mockResolvedValue([]),
  getIntlSchedules: jest.fn().mockResolvedValue([]),
};

describe('GetIntlScheduleUseCase', () => {
  const useCase = new GetIntlScheduleUseCase(mockRepo);

  it('useMock=true이면 originCode로 필터링된 Mock 국제선 스케줄을 반환한다', async () => {
    const result = await useCase.execute('ICN', true);
    expect(result.every(s => s.origin === 'ICN')).toBe(true);
  });

  it('반환된 스케줄에 destinationFlag가 포함된다', async () => {
    const result = await useCase.execute('ICN', true);
    expect(result[0].destinationFlag).toBeTruthy();
  });
});
