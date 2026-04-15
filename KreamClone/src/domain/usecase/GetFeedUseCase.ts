import { StyleModel } from '../model/StyleModel';
import { MOCK_STYLES } from '../../data/mock/styleMock';

export class GetFeedUseCase {
  async execute(useMock = true): Promise<StyleModel[]> {
    if (useMock) {
      return MOCK_STYLES;
    }
    // TODO: API 연동 필요 — GET /api/v1/feed
    throw new Error('Repository not configured');
  }

  async getByUser(userId: string, useMock = true): Promise<StyleModel[]> {
    if (useMock) {
      return MOCK_STYLES.filter((s) => s.userId === userId);
    }
    // TODO: API 연동 필요 — GET /api/v1/users/{userId}/styles
    throw new Error('Repository not configured');
  }
}
