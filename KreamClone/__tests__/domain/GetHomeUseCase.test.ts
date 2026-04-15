import { GetHomeUseCase } from '../../src/domain/usecase/GetHomeUseCase';

describe('GetHomeUseCase', () => {
  const useCase = new GetHomeUseCase();

  it('useMock=true: HomeData 반환', async () => {
    const result = await useCase.execute(true);
    expect(result.banners.length).toBeGreaterThan(0);
    expect(result.trendingProducts.length).toBeGreaterThan(0);
    expect(result.rankingProducts.length).toBeGreaterThan(0);
    expect(result.newArrivals.length).toBeGreaterThan(0);
    expect(result.categories.length).toBeGreaterThan(0);
  });

  it('useMock=true: 카테고리 목록에 스니커즈 포함', async () => {
    const result = await useCase.execute(true);
    expect(result.categories).toContain('스니커즈');
  });
});
