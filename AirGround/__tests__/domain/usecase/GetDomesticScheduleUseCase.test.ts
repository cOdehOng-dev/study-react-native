import { GetDomesticScheduleUseCase } from '@/domain/usecase/GetDomesticScheduleUseCase';
import { ScheduleRepository } from '@/domain/repository/ScheduleRepository';

const mockRepo: ScheduleRepository = {
  getDomesticSchedules: jest.fn().mockResolvedValue([]),
  getIntlSchedules: jest.fn().mockResolvedValue([]),
};

describe('GetDomesticScheduleUseCase', () => {
  const useCase = new GetDomesticScheduleUseCase(mockRepo);

  it('useMock=true이면 originCode로 필터링된 Mock 스케줄을 반환한다', async () => {
    const result = await useCase.execute('GMP', true);
    expect(result.every(s => s.origin === 'GMP')).toBe(true);
    expect(mockRepo.getDomesticSchedules).not.toHaveBeenCalled();
  });

  it('존재하지 않는 originCode이면 빈 배열을 반환한다', async () => {
    const result = await useCase.execute('XXX', true);
    expect(result).toEqual([]);
  });
});
