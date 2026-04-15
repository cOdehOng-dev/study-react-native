import { FlightRepository } from '@/domain/repository/FlightRepository';
import { FlightStatus } from '@/domain/model/FlightStatus';

export class FlightRepositoryImpl implements FlightRepository {
  async getRealtimeFlights(): Promise<FlightStatus[]> {
    // TODO: API 연동 필요 — GET /api/v1/flights/realtime
    return [];
  }
}
