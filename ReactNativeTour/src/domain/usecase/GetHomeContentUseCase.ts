// src/domain/usecase/GetHomeContentUseCase.ts
import { HomeContent } from '../model/HomeContent';
import { TourRepository } from '../repository/TourRepository';

export class GetHomeContentUseCase {
  constructor(private readonly repository: TourRepository) {}

  async execute(): Promise<HomeContent> {
    try {
      return await this.repository.getHomeContent();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(`GetHomeContentUseCase 실패: ${msg}`);
    }
  }
}
