import React from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, Alert,
} from 'react-native';
import { ShopStackScreenProps } from '../navigation/types';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';

type Props = ShopStackScreenProps<'ShopProductDetail'>;

export default function ShopProductDetailScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  if (!product) {
    return (
      <SafeAreaWrapper>
        <Header title="상품 상세" onBack={() => navigation.goBack()} />
        <EmptyState message="상품을 찾을 수 없습니다." />
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      <Header title="상품 상세" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.buyPrice.toLocaleString()}원~</Text>
          <Text style={styles.wishCount}>♥ {product.wishCount.toLocaleString()}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={`구매  ${product.buyPrice.toLocaleString()}원`}
          onPress={() => Alert.alert('안내', '홈 탭에서 구매하기 버튼을 이용해주세요.')}
          style={styles.buyBtn}
        />
        <Button
          label="판매"
          onPress={() => Alert.alert('안내', '홈 탭에서 판매하기 버튼을 이용해주세요.')}
          variant="secondary"
          style={styles.sellBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.gray100 },
  info: { padding: 16, gap: 8 },
  brand: { fontSize: 13, color: colors.gray500 },
  name: { fontSize: 16, fontWeight: '700', color: colors.primary },
  price: { fontSize: 20, fontWeight: '900', color: colors.primary },
  wishCount: { fontSize: 13, color: colors.gray500 },
  footer: {
    flexDirection: 'row', gap: 8,
    padding: 12, borderTopWidth: 1, borderTopColor: colors.gray200,
  },
  buyBtn: { flex: 2 },
  sellBtn: { flex: 1 },
});
