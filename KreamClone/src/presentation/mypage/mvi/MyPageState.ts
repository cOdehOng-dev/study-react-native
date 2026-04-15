import { UserModel } from '../../../domain/model/UserModel';
import { OrderModel } from '../../../domain/model/OrderModel';
import { ProductModel } from '../../../domain/model/ProductModel';

export interface MyPageState {
  user: UserModel | null;
  orders: OrderModel[];
  wishlist: ProductModel[];
  isLoading: boolean;
  error: string | null;
}

export const initialMyPageState: MyPageState = {
  user: null,
  orders: [],
  wishlist: [],
  isLoading: false,
  error: null,
};
