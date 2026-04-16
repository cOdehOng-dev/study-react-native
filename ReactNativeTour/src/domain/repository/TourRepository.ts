// src/domain/repository/TourRepository.ts
import { HomeContent } from '../model/HomeContent';
import { SearchDefaults } from '../model/SearchQuery';

export interface TourRepository {
  getHomeContent(): Promise<HomeContent>;
  getSearchDefaults(): Promise<SearchDefaults>;
}
