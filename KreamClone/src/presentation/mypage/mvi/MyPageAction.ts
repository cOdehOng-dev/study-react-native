import { UserModel } from '../../../../domain/model/UserModel';
import { OrderModel } from '../../../../domain/model/OrderModel';
import { ProductModel } from '../../../../domain/model/ProductModel';

export type MyPageAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'LOAD_SUCCESS'; user: UserModel; orders: OrderModel[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'TOGGLE_WISH'; product: ProductModel };
