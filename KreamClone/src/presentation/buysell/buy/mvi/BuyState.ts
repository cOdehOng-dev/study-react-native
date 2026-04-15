import { SizeModel } from '../../../../domain/model/SizeModel';

export interface BuyState {
  isLoading: boolean;
  error: string | null;
  sizes: SizeModel[];
  selectedSize: SizeModel | null;
  bidPrice: number;
  isSuccess: boolean;
}

export const initialBuyState: BuyState = {
  isLoading: false,
  error: null,
  sizes: [],
  selectedSize: null,
  bidPrice: 0,
  isSuccess: false,
};
