export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Order: undefined;
  History: undefined;
  Membership: undefined;
  MyPage: undefined;
};

export type OrderStackParamList = {
  ServiceSelect: undefined;
  Quantity: undefined;
  Schedule: undefined;
  Address: undefined;
  OrderSummary: undefined;
};

export type HistoryStackParamList = {
  HistoryList: undefined;
  HistoryDetail: {orderId: string};
};

export type MyPageStackParamList = {
  MyPageHome: undefined;
  ProfileEdit: undefined;
  AddressManage: undefined;
  Notification: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
