import { GetFlightStatusUseCase } from '@/domain/usecase/GetFlightStatusUseCase';
import { MOCK_FLIGHT_STATUS } from '@/data/mock/flightStatus.mock';
import { FlightRepository } from '@/domain/repository/FlightRepository';

const mockRepo: FlightRepository = {
  getRealtimeFlights: jest.fn().mockResolvedValue([]),
};

describe('GetFlightStatusUseCase', () => {
  const useCase = new GetFlightStatusUseCase(mockRepo);

  beforeEach(() => jest.clearAllMocks());

  it('useMock=true이면 MOCK_FLIGHT_STATUS를 반환한다', async () => {
    const result = await useCase.execute(true);
    expect(result).toEqual(MOCK_FLIGHT_STATUS);
    expect(mockRepo.getRealtimeFlights).not.toHaveBeenCalled();
  });

  it('useMock=false이면 repo.getRealtimeFlights를 호출한다', async () => {
    await useCase.execute(false);
    expect(mockRepo.getRealtimeFlights).toHaveBeenCalledTimes(1);
  });
});
