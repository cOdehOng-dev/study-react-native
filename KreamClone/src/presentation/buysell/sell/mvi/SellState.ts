import { SizeModel } from '../../../../domain/model/SizeModel';

export interface SellState {
  isLoading: boolean;
  error: string | null;
  sizes: SizeModel[];
  selectedSize: SizeModel | null;
  askPrice: number;
  isSuccess: boolean;
}

export const initialSellState: SellState = {
  isLoading: false,
  error: null,
  sizes: [],
  selectedSize: null,
  askPrice: 0,
  isSuccess: false,
};
