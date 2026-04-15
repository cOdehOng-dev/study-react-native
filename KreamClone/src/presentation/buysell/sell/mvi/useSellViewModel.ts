import { useReducer, useCallback, useEffect } from 'react';
import { sellReducer } from './SellReducer';
import { initialSellState } from './SellState';
import { SizeModel } from '../../../../domain/model/SizeModel';
import { GetProductSizesUseCase } from '../../../../domain/usecase/GetProductSizesUseCase';
import { PlaceSellAskUseCase } from '../../../../domain/usecase/PlaceSellAskUseCase';

const getSizesUseCase = new GetProductSizesUseCase();
const placeAskUseCase = new PlaceSellAskUseCase();

export function useSellViewModel(productId: string) {
  const [state, dispatch] = useReducer(sellReducer, initialSellState);

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

  const setAskPrice = useCallback((price: number) => {
    dispatch({ type: 'SET_ASK_PRICE', price });
  }, []);

  const placeAsk = useCallback(async () => {
    if (!state.selectedSize) {
      dispatch({ type: 'SET_ERROR', error: '사이즈를 선택해주세요.' });
      return;
    }
    dispatch({ type: 'SET_LOADING', isLoading: true });
    try {
      await placeAskUseCase.execute({
        productId,
        size: state.selectedSize.size,
        price: state.askPrice,
      });
      dispatch({ type: 'PLACE_ASK_SUCCESS' });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', error: (e as Error).message });
    }
  }, [productId, state.selectedSize, state.askPrice]);

  useEffect(() => {
    loadSizes();
  }, [loadSizes]);

  return { state, selectSize, setAskPrice, placeAsk };
}
