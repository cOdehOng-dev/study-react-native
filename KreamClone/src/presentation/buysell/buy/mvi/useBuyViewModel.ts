import { useReducer, useCallback, useEffect } from 'react';
import { buyReducer } from './BuyReducer';
import { initialBuyState } from './BuyState';
import { SizeModel } from '../../../../domain/model/SizeModel';
import { GetProductSizesUseCase } from '../../../../domain/usecase/GetProductSizesUseCase';
import { PlaceBuyBidUseCase } from '../../../../domain/usecase/PlaceBuyBidUseCase';

const getSizesUseCase = new GetProductSizesUseCase();
const placeBidUseCase = new PlaceBuyBidUseCase();

export function useBuyViewModel(productId: string) {
  const [state, dispatch] = useReducer(buyReducer, initialBuyState);

  const loadSizes = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      const sizes = await getSizesUseCase.execute(productId);
      dispatch({ type: 'SET_SIZES', sizes });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, [productId]);

  const selectSize = useCallback((size: SizeModel) => {
    dispatch({ type: 'SELECT_SIZE', size });
  }, []);

  const setBidPrice = useCallback((price: number) => {
    dispatch({ type: 'SET_BID_PRICE', price });
  }, []);

  const placeBid = useCallback(async () => {
    if (!state.selectedSize) {
      dispatch({ type: 'SET_ERROR', error: '사이즈를 선택해주세요.' });
      return;
    }
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      await placeBidUseCase.execute({
        productId,
        size: state.selectedSize.size,
        price: state.bidPrice,
      });
      dispatch({ type: 'PLACE_BID_SUCCESS' });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, [productId, state.selectedSize, state.bidPrice]);

  useEffect(() => {
    loadSizes();
  }, [loadSizes]);

  return { state, selectSize, setBidPrice, placeBid };
}
