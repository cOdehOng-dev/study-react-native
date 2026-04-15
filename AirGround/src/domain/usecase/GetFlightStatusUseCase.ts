import { FlightStatus } from '../model/FlightStatus';
import { FlightRepository } from '../repository/FlightRepository';
import { MOCK_FLIGHT_STATUS } from '@/data/mock/flightStatus.mock';

export class GetFlightStatusUseCase {
  constructor(private readonly repo: FlightRepository) {}

  async execute(useMock = true): Promise<FlightStatus[]> {
    if (useMock) return MOCK_FLIGHT_STATUS;
    // TODO: API 연동 필요 — GET /api/v1/flights/realtime
    return this.repo.getRealtimeFlights();
  }
}
