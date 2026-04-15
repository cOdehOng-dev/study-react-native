import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { ProductModel } from '../../domain/model/ProductModel';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'Wishlist'>;

const INITIAL_WISHLIST = ALL_PRODUCTS.slice(0, 3);

export default function WishlistScreen({ navigation }: Props) {
  const [wishlist, setWishlist] = useState<ProductModel[]>(INITIAL_WISHLIST);

  return (
    <SafeAreaWrapper>
      <Header title="관심 상품" onBack={() => navigation.goBack()} />
      {wishlist.length === 0 ? (
        <EmptyState message="관심 상품이 없습니다." subMessage="마음에 드는 상품을 찜해보세요." />
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                brand={item.brand}
                name={item.name}
                price={item.buyPrice}
                imageUri={item.imageUri}
                onPress={() => navigation.navigate('WishProductDetail', { productId: item.id })}
              />
            </View>
          )}
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
