import { GetFeedUseCase } from '../../src/domain/usecase/GetFeedUseCase';

describe('GetFeedUseCase', () => {
  const useCase = new GetFeedUseCase();

  it('execute: mock 피드 12개 반환', async () => {
    const result = await useCase.execute(true);
    expect(result).toHaveLength(12);
    expect(result[0]).toMatchObject({
      id: 's001',
      username: 'sneaker_king',
    });
  });

  it('execute: 각 스타일에 imageUri 존재', async () => {
    const result = await useCase.execute(true);
    result.forEach((style) => {
      expect(style.imageUri).toMatch(/^https:\/\//);
    });
  });

  it('getByUser: 특정 유저 스타일만 반환', async () => {
    const result = await useCase.getByUser('u001', true);
    expect(result.every((s) => s.userId === 'u001')).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('execute: useMock=false 시 에러 발생', async () => {
    await expect(useCase.execute(false)).rejects.toThrow('Repository not configured');
  });
});
