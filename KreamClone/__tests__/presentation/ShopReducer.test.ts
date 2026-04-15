import { shopReducer } from '../../src/presentation/shop/mvi/ShopReducer';
import { initialShopState } from '../../src/presentation/shop/mvi/ShopState';
import { ProductModel } from '../../src/domain/model/ProductModel';

const mockProduct: ProductModel = {
  id: 'p001', brand: 'Nike', name: 'Air Force 1',
  imageUri: 'https://picsum.photos/seed/p001/300/300',
  buyPrice: 119000, sellPrice: 110000, wishCount: 1000,
  category: '스니커즈', isNew: false,
};

describe('shopReducer', () => {
  it('SET_CATEGORY: 카테고리 업데이트', () => {
    const result = shopReducer(initialShopState, { type: 'SET_CATEGORY', category: '스니커즈' });
    expect(result.selectedCategory).toBe('스니커즈');
  });

  it('SET_LOADING: 로딩 상태 업데이트', () => {
    const result = shopReducer(initialShopState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('LOAD_SUCCESS: 상품 저장, 로딩 해제, 에러 초기화', () => {
    const loading = { ...initialShopState, isLoading: true };
    const result = shopReducer(loading, { type: 'LOAD_SUCCESS', products: [mockProduct] });
    expect(result.products).toHaveLength(1);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBeNull();
  });

  it('SET_ERROR: 에러 저장, 로딩 해제', () => {
    const result = shopReducer(initialShopState, { type: 'SET_ERROR', error: '오류 발생' });
    expect(result.error).toBe('오류 발생');
    expect(result.isLoading).toBe(false);
  });

  it('SET_SORT: 정렬 옵션 업데이트', () => {
    const result = shopReducer(initialShopState, { type: 'SET_SORT', sort: 'price_asc' });
    expect(result.sort).toBe('price_asc');
  });

  it('알 수 없는 액션: 상태 유지', () => {
    const result = shopReducer(initialShopState, { type: 'UNKNOWN' } as never);
    expect(result).toEqual(initialShopState);
  });
});
