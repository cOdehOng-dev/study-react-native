// src/domain/usecase/GetHomeContentUseCase.ts
import { HomeContent } from '../model/HomeContent';
import { TourRepository } from '../repository/TourRepository';

export class GetHomeContentUseCase {
  constructor(private readonly repository: TourRepository) {}

  async execute(): Promise<HomeContent> {
    try {
      return await this.repository.getHomeContent();
    } catch (error) {
      throw new Error('GetHomeContentUseCase 실패: ' + (error as Error).message);
    }
  }
}
