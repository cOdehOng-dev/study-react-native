import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyPageStackParamList } from './types';
import MyPageScreen from '../mypage/MyPageScreen';
import OrderHistoryScreen from '../mypage/OrderHistoryScreen';
import WishlistScreen from '../mypage/WishlistScreen';
import MyStylesScreen from '../mypage/MyStylesScreen';
import AccountSettingsScreen from '../mypage/AccountSettingsScreen';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { MOCK_STYLES } from '../../data/mock/styleMock';
import { colors } from '../theme/colors';

type WishProductDetailProps = NativeStackScreenProps<MyPageStackParamList, 'WishProductDetail'>;
type MyStyleDetailProps = NativeStackScreenProps<MyPageStackParamList, 'MyStyleDetail'>;

function WishProductDetailScreen({ navigation, route }: WishProductDetailProps) {
  const product = ALL_PRODUCTS.find((p) => p.id === route.params.productId) ?? ALL_PRODUCTS[0];
  return (
    <SafeAreaWrapper>
      <Header title="상품 상세" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: product.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.buyPrice.toLocaleString()}원</Text>
        </View>
        <View style={styles.btnRow}>
          <Button
            label="구매하기"
            onPress={() => Alert.alert('안내', '홈 탭에서 상품을 검색하여 구매해주세요.')}
            style={styles.btn}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

function MyStyleDetailScreen({ navigation, route }: MyStyleDetailProps) {
  const style = MOCK_STYLES.find((s) => s.id === route.params.styleId) ?? MOCK_STYLES[0];
  return (
    <SafeAreaWrapper>
      <Header title="내 스타일" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: style.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{style.description}</Text>
          <Text style={styles.brand}>♥ {style.likeCount.toLocaleString()}</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.gray100 },
  info: { padding: 16, gap: 6 },
  brand: { fontSize: 13, color: colors.gray500 },
  name: { fontSize: 16, fontWeight: '700', color: colors.primary },
  price: { fontSize: 20, fontWeight: '900', color: colors.primary, marginTop: 4 },
  btnRow: { padding: 16 },
  btn: { width: '100%' },
});

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export default function MyPageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageMain" component={MyPageScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="WishProductDetail" component={WishProductDetailScreen} />
      <Stack.Screen name="MyStyles" component={MyStylesScreen} />
      <Stack.Screen name="MyStyleDetail" component={MyStyleDetailScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    </Stack.Navigator>
  );
}
