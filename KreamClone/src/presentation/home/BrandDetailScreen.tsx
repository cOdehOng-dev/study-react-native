import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_BRANDS } from '../../data/mock/brandsMock';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { ProductCard } from '../components/ProductCard';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'BrandDetail'>;

export default function BrandDetailScreen({ navigation, route }: Props) {
  const brand = MOCK_BRANDS.find((b) => b.id === route.params.brandId) ?? MOCK_BRANDS[0];
  const products = ALL_PRODUCTS.filter((p) => p.brand === brand.name).slice(0, 6);

  return (
    <SafeAreaWrapper>
      <Header title={brand.name} onBack={() => navigation.goBack()} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <Image source={{ uri: brand.logoUri }} style={styles.logo} />
            <Text style={styles.name}>{brand.name}</Text>
            <Text style={styles.nameKo}>{brand.nameKo}</Text>
            <Text style={styles.count}>{brand.productCount.toLocaleString()}개 상품</Text>
          </View>
        }
        data={products.length > 0 ? products : ALL_PRODUCTS.slice(0, 6)}
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
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          </View>
        )}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', padding: 24, gap: 8 },
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.gray200 },
  name: { fontSize: 22, fontWeight: '900', color: colors.primary },
  nameKo: { fontSize: 14, color: colors.gray500 },
  count: { fontSize: 13, color: colors.gray500 },
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
