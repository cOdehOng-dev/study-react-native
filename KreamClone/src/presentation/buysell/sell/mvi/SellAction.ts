import { SizeModel } from '../../../../domain/model/SizeModel';

export type SellAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_SIZES'; sizes: SizeModel[] }
  | { type: 'SELECT_SIZE'; size: SizeModel }
  | { type: 'SET_ASK_PRICE'; price: number }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'PLACE_ASK_SUCCESS' }
  | { type: 'RESET' };
