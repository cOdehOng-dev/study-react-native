import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Shop: undefined;
  Feed: undefined;
  Search: undefined;
  My: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductDetail: { productId: string };
  BrandList: undefined;
  BrandDetail: { brandId: string };
  Category: { categoryId?: string };
  BannerDetail: { bannerId: string };
  StyleFeed: undefined;
  Ranking: undefined;
  NewArrival: undefined;
  Benefit: undefined;
  Event: undefined;
  EventDetail: { eventId: string };
  Collection: undefined;
  CollectionDetail: { collectionId: string };
  Notification: undefined;
  NotificationDetail: { notificationId: string };
  Buy: { productId: string };
  BuyBid: { productId: string; size: string; buyPrice: number };
  BuyConfirm: { productId: string; size: string; price: number; isBid: boolean };
  BuyComplete: { productId: string; orderId: string };
  Sell: { productId: string };
  SellAsk: { productId: string; size: string; sellPrice: number };
  SellConfirm: { productId: string; size: string; price: number; isBid: boolean };
  SellComplete: { productId: string; orderId: string };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type FeedStackParamList = {
  FeedMain: undefined;
  StyleDetail: { styleId: string };
  StyleCreate: undefined;
  FeedUser: { userId: string };
  StyleProductDetail: { productId: string };
};

export type FeedStackScreenProps<T extends keyof FeedStackParamList> =
  NativeStackScreenProps<FeedStackParamList, T>;

export type SearchStackParamList = {
  SearchMain: undefined;
  SearchResults: { query: string };
  SearchProductDetail: { productId: string };
};

export type SearchStackScreenProps<T extends keyof SearchStackParamList> =
  NativeStackScreenProps<SearchStackParamList, T>;

export type MyPageStackParamList = {
  MyPageMain: undefined;
  OrderHistory: undefined;
  Wishlist: undefined;
  WishProductDetail: { productId: string };
  MyStyles: undefined;
  MyStyleDetail: { styleId: string };
  AccountSettings: undefined;
};

export type MyPageStackScreenProps<T extends keyof MyPageStackParamList> =
  NativeStackScreenProps<MyPageStackParamList, T>;

export type ShopStackParamList = {
  ShopMain: undefined;
  ShopBrand: { brandName: string };
  ShopProductDetail: { productId: string };
};

export type ShopStackScreenProps<T extends keyof ShopStackParamList> =
  NativeStackScreenProps<ShopStackParamList, T>;
