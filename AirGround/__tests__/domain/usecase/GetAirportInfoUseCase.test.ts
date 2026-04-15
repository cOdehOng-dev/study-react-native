import { GetAirportInfoUseCase } from '@/domain/usecase/GetAirportInfoUseCase';
import { AirportRepository } from '@/domain/repository/AirportRepository';

const mockRepo: AirportRepository = {
  searchByCity: jest.fn().mockResolvedValue([]),
};

describe('GetAirportInfoUseCase', () => {
  const useCase = new GetAirportInfoUseCase(mockRepo);

  beforeEach(() => jest.clearAllMocks());

  it('빈 문자열이면 빈 배열을 반환한다', async () => {
    const result = await useCase.execute('', true);
    expect(result).toEqual([]);
  });

  it('useMock=true이면 한국어 도시명으로 공항을 검색한다', async () => {
    const result = await useCase.execute('서울', true);
    expect(result.length).toBeGreaterThan(0);
    expect(mockRepo.searchByCity).not.toHaveBeenCalled();
  });

  it('useMock=true이면 IATA 코드로도 검색된다', async () => {
    const result = await useCase.execute('ICN', true);
    expect(result.some(a => a.iataCode === 'ICN')).toBe(true);
  });
});
