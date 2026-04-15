import { AirportInfo } from '../model/AirportInfo';
import { AirportRepository } from '../repository/AirportRepository';
import { MOCK_AIRPORTS } from '@/data/mock/airports.mock';

export class GetAirportInfoUseCase {
  constructor(private readonly repo: AirportRepository) {}

  async execute(cityName: string, useMock = true): Promise<AirportInfo[]> {
    if (!cityName.trim()) return [];
    if (useMock) {
      const lower = cityName.toLowerCase();
      return MOCK_AIRPORTS.filter(
        a =>
          a.cityKo.toLowerCase().includes(lower) ||
          a.nameKo.toLowerCase().includes(lower) ||
          a.nameEn.toLowerCase().includes(lower) ||
          a.iataCode.toLowerCase().includes(lower),
      );
    }
    // TODO: API 연동 필요 — GET /api/v1/airports?city={cityName}
    return this.repo.searchByCity(cityName);
  }
}
