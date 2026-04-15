import { GetSearchResultsUseCase } from '../../src/domain/usecase/GetSearchResultsUseCase';

describe('GetSearchResultsUseCase', () => {
  const useCase = new GetSearchResultsUseCase();

  it('query가 빈 문자열이면 빈 배열 반환', async () => {
    const result = await useCase.execute('', true);
    expect(result).toHaveLength(0);
  });

  it('brand 기준으로 검색 — Nike 검색 시 브랜드 또는 상품명에 nike 포함', async () => {
    const result = await useCase.execute('Nike', true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) =>
      expect(
        p.brand.toLowerCase().includes('nike') || p.name.toLowerCase().includes('nike'),
      ).toBe(true),
    );
  });

  it('name 기준으로 검색 — Air 검색 시 결과 반환', async () => {
    const result = await useCase.execute('Air', true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.name).toMatch(/Air/i));
  });

  it('대소문자 구분 없이 검색', async () => {
    const upper = await useCase.execute('NIKE', true);
    const lower = await useCase.execute('nike', true);
    expect(upper.length).toBe(lower.length);
    expect(upper.length).toBeGreaterThan(0);
  });

  it('useMock=false 시 에러 발생', async () => {
    await expect(useCase.execute('Nike', false)).rejects.toThrow('Repository not configured');
  });
});
