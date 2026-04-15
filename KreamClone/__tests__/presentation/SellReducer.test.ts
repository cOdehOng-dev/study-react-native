import { sellReducer } from '../../src/presentation/buysell/sell/mvi/SellReducer';
import { initialSellState } from '../../src/presentation/buysell/sell/mvi/SellState';

describe('SellReducer', () => {
  it('SET_LOADING true 설정', () => {
    const result = sellReducer(initialSellState, { type: 'SET_LOADING', isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  it('SET_SIZES 사이즈 목록 설정', () => {
    const sizes = [{ size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 }];
    const result = sellReducer(initialSellState, { type: 'SET_SIZES', sizes });
    expect(result.sizes).toHaveLength(1);
  });

  it('SELECT_SIZE 사이즈 선택시 askPrice가 sellPrice로 초기화', () => {
    const size = { size: '260', buyPrice: 119000, sellPrice: 110000, buyBidCount: 10, sellAskCount: 3 };
    const result = sellReducer(initialSellState, { type: 'SELECT_SIZE', size });
    expect(result.selectedSize?.size).toBe('260');
    expect(result.askPrice).toBe(110000);
  });

  it('SET_ASK_PRICE 호가 설정', () => {
    const result = sellReducer(initialSellState, { type: 'SET_ASK_PRICE', price: 108000 });
    expect(result.askPrice).toBe(108000);
  });

  it('SET_ERROR 에러 설정', () => {
    const result = sellReducer(initialSellState, { type: 'SET_ERROR', error: '오류 발생' });
    expect(result.error).toBe('오류 발생');
  });
});
