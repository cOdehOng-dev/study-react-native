import { IAuthRepository, LoginCredentials } from '../repository/IAuthRepository';
import { UserModel } from '../model/UserModel';
import { MOCK_USER } from '../../data/mock/authMock';

export class LoginUseCase {
  constructor(private readonly repo?: IAuthRepository) {}

  async execute(credentials: LoginCredentials, useMock = true): Promise<UserModel> {
    if (useMock) {
      if (!credentials.email || !credentials.password) {
        throw new Error('이메일과 비밀번호를 입력해주세요.');
      }
      return MOCK_USER;
    }
    // TODO: API 연동 필요 — POST /api/v1/auth/login
    if (!this.repo) {
      throw new Error('Repository가 설정되지 않았습니다. useMock=true를 사용하거나 Repository를 주입해주세요.');
    }
    return this.repo.login(credentials);
  }
}
