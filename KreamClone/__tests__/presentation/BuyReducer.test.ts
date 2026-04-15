import { buyReducer } from '../../src/presentation/buysell/buy/mvi/BuyReducer';
import { initialBuyState } from '../../src/presentation/buysell/buy/mvi/BuyState';

describe('BuyReducer', () => {
  it('SET_LOADING true 설정', () => {
    const result = buyReducer(initialBuyState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('SET_SIZES 사이즈 목록 설정', () => {
    const sizes = [{ size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 }];
    const result = buyReducer(initialBuyState, { type: 'SET_SIZES', sizes });
    expect(result.sizes).toHaveLength(1);
    expect(result.sizes[0].size).toBe('260');
  });

  it('SELECT_SIZE 사이즈 선택', () => {
    const size = { size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 };
    const result = buyReducer(initialBuyState, { type: 'SELECT_SIZE', size });
    expect(result.selectedSize?.size).toBe('260');
  });

  it('SET_BID_PRICE 입찰가 설정', () => {
    const result = buyReducer(initialBuyState, { type: 'SET_BID_PRICE', price: 115000 });
    expect(result.bidPrice).toBe(115000);
  });

  it('SET_ERROR 에러 설정', () => {
    const result = buyReducer(initialBuyState, { type: 'SET_ERROR', error: '오류 발생' });
    expect(result.error).toBe('오류 발생');
  });
});
