import { GetMyPageUseCase } from '../../src/domain/usecase/GetMyPageUseCase';

describe('GetMyPageUseCase', () => {
  const useCase = new GetMyPageUseCase();

  it('execute: mock 유저 정보 반환', async () => {
    const result = await useCase.execute(true);
    expect(result.user).toBeDefined();
    expect(result.user.id).toBeTruthy();
    expect(result.user.email).toBeTruthy();
  });

  it('execute: mock 주문 내역 반환', async () => {
    const result = await useCase.execute(true);
    expect(Array.isArray(result.orders)).toBe(true);
    expect(result.orders.length).toBeGreaterThan(0);
  });

  it('execute: 구매 주문과 판매 주문 모두 포함', async () => {
    const result = await useCase.execute(true);
    const types = result.orders.map((o) => o.type);
    expect(types).toContain('구매');
    expect(types).toContain('판매');
  });

  it('execute: useMock=false 시 에러 발생', async () => {
    await expect(useCase.execute(false)).rejects.toThrow('Repository not configured');
  });
});
