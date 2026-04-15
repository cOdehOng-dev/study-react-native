import { GetProductSizesUseCase } from '../../src/domain/usecase/GetProductSizesUseCase';

describe('GetProductSizesUseCase', () => {
  const useCase = new GetProductSizesUseCase();

  it('알려진 productId의 사이즈 목록 반환', async () => {
    const result = await useCase.execute('p001', true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('size');
    expect(result[0]).toHaveProperty('buyPrice');
    expect(result[0]).toHaveProperty('sellPrice');
  });

  it('알 수 없는 productId는 default 사이즈 반환', async () => {
    const result = await useCase.execute('unknown-id', true);
    expect(result.length).toBeGreaterThan(0);
  });
});
