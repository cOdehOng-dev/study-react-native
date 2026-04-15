import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';

import HomeScreen from '../home/HomeScreen';
import ProductDetailScreen from '../home/ProductDetailScreen';
import BrandListScreen from '../home/BrandListScreen';
import BrandDetailScreen from '../home/BrandDetailScreen';
import CategoryScreen from '../home/CategoryScreen';
import BannerDetailScreen from '../home/BannerDetailScreen';
import StyleFeedScreen from '../home/StyleFeedScreen';
import RankingScreen from '../home/RankingScreen';
import NewArrivalScreen from '../home/NewArrivalScreen';
import BenefitScreen from '../home/BenefitScreen';
import EventScreen from '../home/EventScreen';
import EventDetailScreen from '../home/EventDetailScreen';
import CollectionScreen from '../home/CollectionScreen';
import CollectionDetailScreen from '../home/CollectionDetailScreen';
import NotificationScreen from '../home/NotificationScreen';
import NotificationDetailScreen from '../home/NotificationDetailScreen';
import BuyScreen from '../buysell/buy/BuyScreen';
import BuyBidScreen from '../buysell/buy/BuyBidScreen';
import BuyConfirmScreen from '../buysell/buy/BuyConfirmScreen';
import BuyCompleteScreen from '../buysell/buy/BuyCompleteScreen';
import SellScreen from '../buysell/sell/SellScreen';
import SellAskScreen from '../buysell/sell/SellAskScreen';
import SellConfirmScreen from '../buysell/sell/SellConfirmScreen';
import SellCompleteScreen from '../buysell/sell/SellCompleteScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="BrandList" component={BrandListScreen} />
      <Stack.Screen name="BrandDetail" component={BrandDetailScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="BannerDetail" component={BannerDetailScreen} />
      <Stack.Screen name="StyleFeed" component={StyleFeedScreen} />
      <Stack.Screen name="Ranking" component={RankingScreen} />
      <Stack.Screen name="NewArrival" component={NewArrivalScreen} />
      <Stack.Screen name="Benefit" component={BenefitScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="Collection" component={CollectionScreen} />
      <Stack.Screen name="CollectionDetail" component={CollectionDetailScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <Stack.Screen name="Buy" component={BuyScreen} />
      <Stack.Screen name="BuyBid" component={BuyBidScreen} />
      <Stack.Screen name="BuyConfirm" component={BuyConfirmScreen} />
      <Stack.Screen name="BuyComplete" component={BuyCompleteScreen} />
      <Stack.Screen name="Sell" component={SellScreen} />
      <Stack.Screen name="SellAsk" component={SellAskScreen} />
      <Stack.Screen name="SellConfirm" component={SellConfirmScreen} />
      <Stack.Screen name="SellComplete" component={SellCompleteScreen} />
    </Stack.Navigator>
  );
}
