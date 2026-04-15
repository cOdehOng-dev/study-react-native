import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeedStackParamList } from './types';
import FeedScreen from '../feed/FeedScreen';
import StyleDetailScreen from '../feed/StyleDetailScreen';
import StyleCreateScreen from '../feed/StyleCreateScreen';
import FeedUserScreen from '../feed/FeedUserScreen';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';

type StyleProductDetailProps = NativeStackScreenProps<FeedStackParamList, 'StyleProductDetail'>;

function StyleProductDetailScreen({ navigation, route }: StyleProductDetailProps) {
  const { productId } = route.params;
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

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
            onPress={() =>
              Alert.alert('안내', '홈 탭에서 상품을 검색하여 구매해주세요.')
            }
            style={styles.btn}
          />
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

const Stack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedMain" component={FeedScreen} />
      <Stack.Screen name="StyleDetail" component={StyleDetailScreen} />
      <Stack.Screen name="StyleCreate" component={StyleCreateScreen} />
      <Stack.Screen name="FeedUser" component={FeedUserScreen} />
      <Stack.Screen name="StyleProductDetail" component={StyleProductDetailScreen} />
    </Stack.Navigator>
  );
}
