import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ShopStackScreenProps } from '../navigation/types';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';

type Props = ShopStackScreenProps<'ShopBrand'>;

export default function ShopBrandScreen({ navigation, route }: Props) {
  const { brandName } = route.params;
  const brandProducts = ALL_PRODUCTS.filter((p) => p.brand === brandName);

  return (
    <SafeAreaWrapper>
      <Header title={brandName} onBack={() => navigation.goBack()} />
      {brandProducts.length === 0 ? (
        <EmptyState message={`${brandName} 상품이 없습니다.`} subMessage="다른 브랜드를 선택해보세요." />
      ) : (
        <FlatList
          data={brandProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.countRow}>
              <Text style={styles.countText}>{brandProducts.length}개</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                brand={item.brand}
                name={item.name}
                price={item.buyPrice}
                imageUri={item.imageUri}
                onPress={() => navigation.navigate('ShopProductDetail', { productId: item.id })}
              />
            </View>
          )}
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  countRow: { paddingHorizontal: 16, paddingVertical: 12 },
  countText: { fontSize: 13, color: colors.gray500 },
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
