import { IAuthRepository, RegisterCredentials } from '../repository/IAuthRepository';
import { UserModel } from '../model/UserModel';
import { MOCK_USER } from '../../data/mock/authMock';

export class RegisterUseCase {
  constructor(private readonly repo?: IAuthRepository) {}

  async execute(credentials: RegisterCredentials, useMock = true): Promise<UserModel> {
    if (useMock) {
      if (!credentials.email || !credentials.password || !credentials.name) {
        throw new Error('모든 항목을 입력해주세요.');
      }
      return { ...MOCK_USER, name: credentials.name, email: credentials.email };
    }
    // TODO: API 연동 필요 — POST /api/v1/auth/register
    if (!this.repo) {
      throw new Error('Repository가 설정되지 않았습니다. useMock=true를 사용하거나 Repository를 주입해주세요.');
    }
    return this.repo.register(credentials);
  }
}
