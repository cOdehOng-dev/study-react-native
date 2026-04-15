import { UserModel } from '../model/UserModel';
import { OrderModel } from '../model/OrderModel';
import { MOCK_ORDERS } from '../../data/mock/ordersMock';
import { MOCK_USER } from '../../data/mock/authMock';

export interface MyPageData {
  user: UserModel;
  orders: OrderModel[];
}

export class GetMyPageUseCase {
  async execute(useMock = true): Promise<MyPageData> {
    if (!useMock) {
      // TODO: API 연동 필요 — GET /api/v1/me
      throw new Error('Repository not configured');
    }
    return { user: MOCK_USER, orders: MOCK_ORDERS };
  }
}
