import { AirportRepository } from '@/domain/repository/AirportRepository';
import { AirportInfo } from '@/domain/model/AirportInfo';

export class AirportRepositoryImpl implements AirportRepository {
  async searchByCity(_cityName: string): Promise<AirportInfo[]> {
    // TODO: API 연동 필요 — GET /api/v1/airports?city={cityName}
    return [];
  }
}
