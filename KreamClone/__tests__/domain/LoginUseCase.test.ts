import { LoginUseCase } from '../../src/domain/usecase/LoginUseCase';
import { MOCK_USER } from '../../src/data/mock/authMock';

describe('LoginUseCase', () => {
  const useCase = new LoginUseCase();

  it('useMock=true: 유효한 자격증명으로 MOCK_USER 반환', async () => {
    const result = await useCase.execute({ email: 'test@test.com', password: '1234' });
    expect(result).toEqual(MOCK_USER);
  });

  it('useMock=true: 빈 이메일로 예외 발생', async () => {
    await expect(
      useCase.execute({ email: '', password: '1234' }),
    ).rejects.toThrow('이메일과 비밀번호를 입력해주세요.');
  });

  it('useMock=true: 빈 패스워드로 예외 발생', async () => {
    await expect(
      useCase.execute({ email: 'test@test.com', password: '' }),
    ).rejects.toThrow('이메일과 비밀번호를 입력해주세요.');
  });
});
