import { AirportInfo } from '../model/AirportInfo';
export interface AirportRepository {
  searchByCity(cityName: string): Promise<AirportInfo[]>;
}
