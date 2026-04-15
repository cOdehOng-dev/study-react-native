import { SizeModel } from '../../../../domain/model/SizeModel';

export type BuyAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_SIZES'; sizes: SizeModel[] }
  | { type: 'SELECT_SIZE'; size: SizeModel }
  | { type: 'SET_BID_PRICE'; price: number }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'PLACE_BID_SUCCESS' }
  | { type: 'RESET' };
