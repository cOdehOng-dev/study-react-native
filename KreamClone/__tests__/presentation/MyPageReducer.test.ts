import { myPageReducer } from '../../src/presentation/mypage/mvi/MyPageReducer';
import { initialMyPageState } from '../../src/presentation/mypage/mvi/MyPageState';
import { UserModel } from '../../src/domain/model/UserModel';
import { OrderModel } from '../../src/domain/model/OrderModel';
import { ProductModel } from '../../src/domain/model/ProductModel';

const mockUser: UserModel = { id: 'u001', email: 'test@kream.co.kr', name: '크림유저', profileImage: null };
const mockOrder: OrderModel = {
  id: 'order001', productId: 'p001', productName: 'Nike Air Force 1', size: '260',
  price: 117000, type: '구매', status: '완료', createdAt: '2026-04-10T14:00:00Z',
};
const mockProduct: ProductModel = {
  id: 'p001', brand: 'Nike', name: 'Air Force 1', imageUri: 'https://picsum.photos/seed/p001/300/300',
  buyPrice: 119000, sellPrice: 110000, wishCount: 1000, category: '스니커즈', isNew: false,
};

describe('myPageReducer', () => {
  it('SET_LOADING: 로딩 상태 업데이트', () => {
    const result = myPageReducer(initialMyPageState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('LOAD_SUCCESS: 유저·주문 저장, 로딩 해제, 에러 초기화', () => {
    const loading = { ...initialMyPageState, isLoading: true };
    const result = myPageReducer(loading, { type: 'LOAD_SUCCESS', user: mockUser, orders: [mockOrder] });
    expect(result.isLoading).toBe(false);
    expect(result.user?.id).toBe('u001');
    expect(result.orders).toHaveLength(1);
    expect(result.error).toBeNull();
  });

  it('SET_ERROR: 에러 저장, 로딩 해제', () => {
    const result = myPageReducer(initialMyPageState, { type: 'SET_ERROR', error: '오류 발생' });
    expect(result.error).toBe('오류 발생');
    expect(result.isLoading).toBe(false);
  });

  it('TOGGLE_WISH: 없던 상품을 위시리스트에 추가', () => {
    const result = myPageReducer(initialMyPageState, { type: 'TOGGLE_WISH', product: mockProduct });
    expect(result.wishlist).toHaveLength(1);
    expect(result.wishlist[0].id).toBe('p001');
  });

  it('TOGGLE_WISH: 이미 있는 상품을 위시리스트에서 제거', () => {
    const state = { ...initialMyPageState, wishlist: [mockProduct] };
    const result = myPageReducer(state, { type: 'TOGGLE_WISH', product: mockProduct });
    expect(result.wishlist).toHaveLength(0);
  });

  it('알 수 없는 액션: 상태 유지', () => {
    const result = myPageReducer(initialMyPageState, { type: 'UNKNOWN' } as never);
    expect(result).toEqual(initialMyPageState);
  });
});
